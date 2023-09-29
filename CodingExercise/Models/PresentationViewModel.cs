using System.ComponentModel.DataAnnotations;

namespace CodingExercise.Models
{
    public class PresentationViewModel
    {
        public int Id { get; set; }    
        public string Title { get; set; }
        public string PresenterName { get; set; }
        public int DurationInMinutes { get; set; }
    }
}
