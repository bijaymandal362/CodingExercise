using Microsoft.AspNetCore.Identity;

namespace CodingExercise.Models
{
    public class UserModel 
    {
        public string UserName { get; set; } = "";
        public string Name { get; set; } = "";
        public string Role { get; set; } = "";
        public bool IsActive { get; set; } = false;
        public string Token { get; set; } = "";

        public UserModel(string userName, string name, string role)
        {
            UserName = userName;
            Name = name;
            Role = role;
        }


    }
}