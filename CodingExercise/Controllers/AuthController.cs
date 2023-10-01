using CodingExercise.Entities;
using CodingExercise.Entities.LoginAndRegister;
using CodingExercise.Services.AuthService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.IdentityModel.Tokens.Jwt;

namespace CodingExercise.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ITokenRevocationService _tokenRevocationService;

        public AuthController(IAuthService authService, ITokenRevocationService tokenRevocationService)
        {
            _authService = authService;
            _tokenRevocationService = tokenRevocationService;
        }

        // POST: auth/login
        [AllowAnonymous]
        [HttpPost("/Login")]
        public async Task<IActionResult> Login([FromBody] LoginUser user)
        {
            if (String.IsNullOrEmpty(user.UserName))
            {
                return BadRequest(new { message = "Email address needs to entered" });
            }
            else if (String.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { message = "Password needs to entered" });
            }

            User loggedInUser = await _authService.Login(user.UserName, user.Password);

            if (loggedInUser != null)
            {
                return Ok(loggedInUser);
            }

            return BadRequest(new { message = "User login unsuccessful" });
        }

        // POST: auth/register
        [AllowAnonymous]
        [HttpPost("/Register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser user)
        {
            if (String.IsNullOrEmpty(user.Name))
            {
                return BadRequest(new { message = "Name needs to entered" });
            }
            else if (String.IsNullOrEmpty(user.UserName))
            {
                return BadRequest(new { message = "User name needs to entered" });
            }
            else if (String.IsNullOrEmpty(user.Password))
            {
                return BadRequest(new { message = "Password needs to entered" });
            }

            User userToRegister = new(user.UserName, user.Name, user.Password, user.Role);

            User registeredUser = await _authService.Register(userToRegister);

            User loggedInUser = await _authService.Login(registeredUser.UserName, user.Password);

            if (loggedInUser != null)
            {
                return Ok(new {message=$"Registration successful done, Username: {userToRegister.UserName}, Role: {userToRegister.Role}  Time: {DateTimeOffset.UtcNow} "});
            }

            return BadRequest(new { message = "User registration unsuccessful" });
        }

        // GET: auth/test
        [HttpGet]
        public IActionResult Test()
        {
            string token = Request.Headers["Authorization"];

            if (token.StartsWith("Bearer"))
            {
                token = token.Substring("Bearer ".Length).Trim();
            }
            var handler = new JwtSecurityTokenHandler();

            JwtSecurityToken jwt = handler.ReadJwtToken(token);

            var claims = new Dictionary<string, string>();

            foreach (var claim in jwt.Claims)
            {
                claims.Add(claim.Type, claim.Value);
            }

            return Ok(claims);
        }

     
        [HttpPost("/Logout")]
        [Authorize]
        public IActionResult Logout()
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            // Check if the token is already revoked
            if (_tokenRevocationService.IsTokenRevoked(token))
            {
                return BadRequest(new { message = "Token has already been revoked" });
            }

            // Revoke the token
            _tokenRevocationService.RevokeToken(token);

            // Redirect to a page or return a response as needed
            return Ok(new { message = "Logout successful" });
        }


    }
}
