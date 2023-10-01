
using CodingExercise.Infrastructure.Validater;
using System.ComponentModel.DataAnnotations;

namespace CodingExercise.Entities
{

   
    public class Presentation
    {
        [Key]
        public int Id { get; set; }

        [NoWhiteSpaces]
        [StringLength(255, MinimumLength = 2)]
        [RegularExpression(@"\w")]
        public string Title { get; set; }

        [NoWhiteSpaces]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(@"\w")]
        public string PresenterName { get; set; }

        [Required]
        [Range(1, 60)]
        public int DurationInMinutes { get; set; }
    }
}
