using System.ComponentModel.DataAnnotations;

namespace CodingExercise.Infrastructure.Validater
{
    public class NoWhiteSpacesAttribute : ValidationAttribute
    {
        public NoWhiteSpacesAttribute()
        {
            ErrorMessage = "Field cannot contain white spaces.";
        }

        public override bool IsValid(object value)
        {
            if (value == null)
                return true; // Allow null values

            if (value is string str)
            {
                return !str.Contains(" ");
            }

            return true; // Return true for non-string values
        }
    }
}
