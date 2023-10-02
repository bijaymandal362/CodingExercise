using System.ComponentModel.DataAnnotations;

namespace CodingExercise.Entities.LoginAndRegister
{
    public class RegisterUserModel
    {
        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; } = "";


        [Required(ErrorMessage = "UserName is required.")]
        public string UserName { get; set; } = "";


        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; } = "";


        [Required(ErrorMessage = "Role is required.")]
        [RegularExpression("^(Admin|User)$", ErrorMessage = "Role must be 'Admin' or 'User'.")]
        public string Role { get; set; } = "Everyone";
    }
}
