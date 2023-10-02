namespace CodingExercise.Infrastructure.Exceptions
{
    public class PresentationNotBeNullException : Exception
    {
        public PresentationNotBeNullException() : base("Presentation is null.")
        {

        }
    }
}
