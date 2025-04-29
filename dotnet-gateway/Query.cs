// C:\Users\Shira - Tevetwater\Downloads\work\GraphQL\dotnet-gateway\Query.cs

using DotNetGateway.Types;          // To use our User and Product classes
using System.Net.Http;              // For HttpClient
using System.Collections.Generic;   // For IEnumerable and List
using System.Threading.Tasks;       // For Task
using System.Text.Json;             // For JsonSerializer
using System.Linq;                  // For LINQ (like .ToList(), .FirstOrDefault())
using HotChocolate;                 // Needed for [Service] attribute

namespace DotNetGateway
{
    // This class defines the root query type for our GraphQL schema.
    // Each public method here will correspond to a field the client can query.
    public class Query
    {
        // Resolver for the 'users' query: fetches all users from the REST backend.
        // [Service] IHttpClientFactory allows ASP.NET Core to inject the factory.
        public async Task<IEnumerable<User>> GetUsersAsync([Service] IHttpClientFactory httpClientFactory)
        {
            Console.WriteLine("Gateway: Resolving 'users' query..."); // Log the action

            var httpClient = httpClientFactory.CreateClient();
            // Make the HTTP GET request to the mock backend's /users endpoint
            var response = await httpClient.GetAsync("http://localhost:3000/users");

            // Throw an exception if the HTTP request was not successful (e.g., 400, 500)
            response.EnsureSuccessStatusCode();

            // Read the JSON response body
            var jsonResponse = await response.Content.ReadAsStringAsync();

            // Deserialize the JSON into a list of User objects
            // PropertyNameCaseInsensitive = true handles potential casing differences (e.g., JSON lowercase vs C# uppercase)
            var users = JsonSerializer.Deserialize<IEnumerable<User>>(jsonResponse, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

             Console.WriteLine($"Gateway: Fetched {users?.Count() ?? 0} users from REST backend."); // Log count
            // Return the list of User objects. Return an empty list if deserialization failed.
            return users ?? new List<User>();
        }

        // Resolver for the 'userById' query: fetches a single user by ID.
        // The 'id' parameter comes from the GraphQL query arguments.
        public async Task<User?> GetUserByIdAsync(string id, [Service] IHttpClientFactory httpClientFactory)
        {
            Console.WriteLine($"Gateway: Resolving 'userById' query with ID: {id}..."); // Log the action

            var httpClient = httpClientFactory.CreateClient();
             // Make the HTTP GET request to the mock backend's /users/{id} endpoint
            var response = await httpClient.GetAsync($"http://localhost:3000/users/{id}");

            // If the response is 404 Not Found, return null (GraphQL way to represent a missing object)
            if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                 Console.WriteLine($"Gateway: User with ID '{id}' not found (404)."); // Log not found
                return null;
            }

            // Throw an exception for other unsuccessful HTTP status codes
            response.EnsureSuccessStatusCode();

            // Read and deserialize the JSON response into a single User object
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var user = JsonSerializer.Deserialize<User>(jsonResponse, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

             Console.WriteLine($"Gateway: Fetched user '{user?.Name}' (ID: {id})."); // Log fetched user
            // Return the User object (or null if 404 was handled)
            return user;
        }

         // Resolver for the 'products' query: fetches all products from the REST backend.
         public async Task<IEnumerable<Product>> GetProductsAsync([Service] IHttpClientFactory httpClientFactory)
        {
            Console.WriteLine("Gateway: Resolving 'products' query..."); // Log the action

            var httpClient = httpClientFactory.CreateClient();
            // Make the HTTP GET request to the mock backend's /products endpoint
            var response = await httpClient.GetAsync("http://localhost:3000/products");

            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var products = JsonSerializer.Deserialize<IEnumerable<Product>>(jsonResponse, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            Console.WriteLine($"Gateway: Fetched {products?.Count() ?? 0} products from REST backend."); // Log count
            return products ?? new List<Product>();
        }

        // You could add a GetProductByIdAsync here similar to GetUserByIdAsync if needed for the PoC
        // public async Task<Product?> GetProductByIdAsync(string id, [Service] IHttpClientFactory httpClientFactory) { ... }
    }
}