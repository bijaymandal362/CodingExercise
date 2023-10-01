using CodingExercise.Data;
using CodingExercise.Entities.LoginAndRegister;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace CodingExercise.Services.AuthService
{
    using BCrypt.Net;
    using CodingExercise.Models;

    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IConfiguration _configuration;
        public AuthService(ApplicationDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public async Task<UserModel?> Login(string email, string password)
        {
            var user = await _dbContext.Users.FindAsync(email);
            

            if (user == null || BCrypt.Verify(password, user.Password) == false)
            {
                return null; //returning null intentionally to show that login was unsuccessful
            }

            var userModel = new UserModel(user.UserName, user.Name, user.Role);
                          
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.GivenName, user.Name),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                IssuedAt = DateTime.UtcNow,
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"],
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            userModel.Token = tokenHandler.WriteToken(token);
            userModel.IsActive = true;

            return userModel;
        }

        public async Task<UserModel> Register(User user)
        {
            user.Password = BCrypt.HashPassword(user.Password);
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            var userModel = new UserModel(user.UserName, user.Name, user.Role);
            return userModel;
        }
    }
}
