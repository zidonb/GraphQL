// C:\Users\Shira - Tevetwater\Downloads\work\GraphQL\dotnet-gateway\Types\Product.cs
namespace DotNetGateway.Types
{
    // Represents the 'Product' object shape in our GraphQL schema.
    // Matches the structure returned by the mock backend /products endpoint.
    public class Product
    {
        public string Id { get; set; } = default!; // The product's unique identifier
        public string Name { get; set; } = default!; // The product's name
    }
}