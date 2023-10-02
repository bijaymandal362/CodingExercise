using CodingExercise.Entities;
using CodingExercise.Entities.LoginAndRegister;
using CodingExercise.Models;

namespace CodingExercise.Services.AuthService
{
    public interface IAuthService
    {
        public Task<UserModel> Login(string email, string password);
        public Task<UserModel> Register(User user);
    }
}