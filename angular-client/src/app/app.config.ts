// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // Standalone equivalent of HttpClientModule

// Import Apollo Angular standalone provider - trying another common path
// It might be under 'lib', 'standalone', or another internal path
// Let's try importing the Apollo service itself and see if the provider is related
// A common pattern is to import the provider function directly.
// Let's try importing from the main package path again, but ensure the name is correct.
// Based on Apollo Angular docs for standalone, provideApollo is the function name.
import { provideApollo } from 'apollo-angular'; // Trying 'provideApollo' instead of 'provideApolloOptions'

// Import necessary parts from the core Apollo Client library
// We need InMemoryCache for caching
import { InMemoryCache } from '@apollo/client/core';

// Import the HttpLink class from the correct path within @apollo/client
// This path '@apollo/client/link/http' is the standard for recent versions
import { HttpLink } from '@apollo/client/link/http'; // Correct import path

// Import the gql tag from the graphql package (not needed in config, but good to know)
// import { gql } from 'graphql-tag';

// Define the URL for your GraphQL gateway
// !!! IMPORTANT: Replace 5254 with the actual port your .NET app is running on !!!
const uri = 'http://localhost:5254/graphql';

// Define the application configuration using ApplicationConfig
export const appConfig: ApplicationConfig = {
  providers: [
    // Provide HttpClient functionality (needed by HttpLink)
    provideHttpClient(),

    // Provide the Apollo Client configuration using the corrected provider function name
    provideApollo(() => { // Using 'provideApollo'
      // Instantiate HttpLink directly within the factory function
      // The HttpLink constructor takes the options directly, including the uri
      const httpLink = new HttpLink({ uri }); // Correct way to instantiate HttpLink with URI

      // Create a default in-memory cache instance
      const cache = new InMemoryCache();

      // Return the Apollo Client configuration object
      return {
        link: httpLink, // Use the created HttpLink instance as the link
        cache: cache, // Use the in-memory cache
      };
    }),
  ]
};
