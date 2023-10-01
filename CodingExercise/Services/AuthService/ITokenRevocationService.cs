namespace CodingExercise.Services.AuthService
{
    public interface ITokenRevocationService
    {
        bool IsTokenRevoked(string token);
        void RevokeToken(string token);
    }
}
