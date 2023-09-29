using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CodingExercise.Entities
{

   
    public class Presentation
    {
        [Key]
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
    }
}
