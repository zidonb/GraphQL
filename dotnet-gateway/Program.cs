// C:\Users\Shira - Tevetwater\Downloads\work\GraphQL\dotnet-gateway\Program.cs

// Add necessary using directives at the top
using DotNetGateway; // To use our Query class
using Microsoft.AspNetCore.Builder; // For WebApplication
using Microsoft.Extensions.DependencyInjection; // For IServiceCollection, AddHttpClient, AddCors
using Microsoft.Extensions.Hosting; // For Environments (used implicitly by builder.Build and environment checks)
using HotChocolate.AspNetCore; // For AddGraphQLServer and MapGraphQL
using Microsoft.AspNetCore.Cors.Infrastructure; // Required for UseCors and AddCors

var builder = WebApplication.CreateBuilder(args);

// --- 1. Configure Services ---
// Services are added to the dependency injection container here.

// Add HttpClient services.
builder.Services.AddHttpClient();

// Add CORS services
builder.Services.AddCors(options =>
{
    // Define a CORS policy. You can name it anything.
    options.AddPolicy("AllowLocalhostAndAny",
        builder =>
        {
            // For a PoC from a local file, allowing AnyOrigin is simplest.
            // In a real app, you'd specify allowed origins like .WithOrigins("http://localhost:4200", "https://your-app-domain.com")
            builder.AllowAnyOrigin()
                   .AllowAnyHeader() // Allow common headers like Content-Type, Accept
                   .AllowAnyMethod(); // Allow methods like POST, OPTIONS (for preflight)
        });
});


// Add GraphQL services
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();


// --- 2. Build the Application ---
var app = builder.Build();


// --- 3. Configure the HTTP Request Pipeline ---
// Middleware is configured here to handle incoming requests.

// If running in Development environment, use the Developer Exception Page
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Add the CORS middleware
// IMPORTANT: This must be placed *after* UseRouting() if you were using it,
// and *before* MapGraphQL() and other endpoint routing middleware.
app.UseCors("AllowLocalhostAndAny"); // Use the policy name we defined above


// Map the GraphQL endpoint.
app.MapGraphQL(); // Default path is "/graphql"


// Optional: Map a simple root endpoint
app.MapGet("/", () => "DotNet GraphQL Gateway is running!");


// --- 4. Run the Application ---
app.Run();