using CodingExercise.Entities;
using CodingExercise.Entities.LoginAndRegister;

namespace CodingExercise.Services.AuthService
{
    public interface IAuthService
    {
        public Task<User> Login(string email, string password);
        public Task<User> Register(User user);
    }
}