using CodingExercise.Infrastructure.Validater;
using System.ComponentModel.DataAnnotations;

namespace CodingExercise.Models
{
    public class PresentationViewModel : IValidatableObject
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Title { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string PresenterName { get; set; }

        [Required]
        [Range(1, 60)]
        public int DurationInMinutes { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrWhiteSpace(Title) || Title.Trim() != Title)
            {
                yield return new ValidationResult("Title cannot contain white spaces at the beginning or end of a word.", new[] { nameof(Title) });
            }

            if (string.IsNullOrWhiteSpace(PresenterName) || PresenterName.Trim() != PresenterName)
            {
                yield return new ValidationResult("Presenter Name cannot contain white spaces at the beginning or end of a word.", new[] { nameof(PresenterName) });
            }
        }
    }
}
