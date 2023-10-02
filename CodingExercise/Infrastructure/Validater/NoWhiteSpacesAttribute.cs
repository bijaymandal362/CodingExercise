using System.ComponentModel.DataAnnotations;

namespace CodingExercise.Infrastructure.Validater
{
    public class NoWhiteSpacesAttribute : ValidationAttribute
    {
        public NoWhiteSpacesAttribute()
        {
            ErrorMessage = "Field cannot contain white spaces at the beginning or end of a word.";
        }

        public override bool IsValid(object value)
        {
            if (value == null)
                return true; // Allow null values

            if (value is string str)
            {
                // Split the string into words and check each word
                var words = str.Split(' ');
                foreach (var word in words)
                {
                    if (word.Trim() != word)
                    {
                        // Word has leading or trailing spaces, return false
                        return false;
                    }
                }

                return true; // All words have spaces only in between characters
            }

            return true; // Return true for non-string values
        }
    }

}
