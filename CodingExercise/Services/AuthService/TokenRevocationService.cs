namespace CodingExercise.Services.AuthService
{
    public class TokenRevocationService : ITokenRevocationService
    {
        private readonly List<string> _revokedTokens = new List<string>();

        public bool IsTokenRevoked(string token)
        {
            return _revokedTokens.Contains(token);
        }

        public void RevokeToken(string token)
        {
            _revokedTokens.Add(token);
        }
    }
}
