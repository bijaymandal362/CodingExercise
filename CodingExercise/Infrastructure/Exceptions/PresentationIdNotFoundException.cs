namespace CodingExercise.Infrastructure.Exceptions
{
    public class PresentationIdNotFoundException : Exception
    {
        public PresentationIdNotFoundException(): base("Presentation id not found.")
        {
            
        }
    }
}
