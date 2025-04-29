// C:\Users\Shira - Tevetwater\Downloads\work\GraphQL\dotnet-gateway\Types\User.cs
namespace DotNetGateway.Types
{
    // Represents the 'User' object shape in our GraphQL schema.
    // Matches the structure returned by the mock backend /users and /users/{id} endpoints.
    public class User
    {
        public string Id { get; set; } = default!; // The user's unique identifier
        public string Name { get; set; } = default!; // The user's name
    }
}