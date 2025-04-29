// src/app/data-fetcher/data-fetcher.component.ts

import { Component } from '@angular/core'; // No longer need OnInit as we won't fetch on init
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor etc.

// Import Apollo Angular service
import { Apollo } from 'apollo-angular'; // Import Apollo service

// Import ApolloQueryResult type from the core Apollo Client library
import { ApolloQueryResult } from '@apollo/client/core'; // Correct import for the type

// Import gql tag
import { gql } from 'graphql-tag'; // Import gql tag

// Define the GraphQL query for fetching all users
const GET_USERS_QUERY = gql`
  query {
    users {
      id
      name
    }
  }
`;

// Define the GraphQL query for fetching all products
const GET_PRODUCTS_QUERY = gql`
  query {
    products {
      id
      name
    }
  }
`;


@Component({
  selector: 'app-data-fetcher', // The custom HTML tag for this component
  standalone: true, // Mark this component as standalone
  imports: [CommonModule], // Import CommonModule for template directives
  templateUrl: './data-fetcher.component.html', // Link to the component's HTML template
  styleUrl: './data-fetcher.component.css', // Link to the component's CSS file
})
// No longer implementing OnInit as we won't fetch on init
export class DataFetcherComponent {

  // Properties to hold the data, loading state, and errors for the *current* result
  loading = false; // Initial loading state (starts false as no query is running)
  error: any = null; // Property to hold any errors
  data: any = null; // Property to hold the fetched data (can be users or products)

  // Inject the Apollo service into the component's constructor
  constructor(private apollo: Apollo) {}

  // Method to fetch users when the button is clicked
  fetchUsers(): void {
    this.loading = true; // Set loading state
    this.error = null; // Clear previous errors
    this.data = null; // Clear previous data

    this.apollo
      .watchQuery({
        query: GET_USERS_QUERY, // Execute the users query
      })
      .valueChanges
      .subscribe({
        next: (result: ApolloQueryResult<any>) => {
          this.loading = result.loading;
          this.error = result.error;
          this.data = result.data; // Assign the entire data object

          if (result.error) {
             console.error('GraphQL error fetching users:', result.error);
          }
        },
        error: (error: any) => {
          this.loading = false;
          this.error = error;
          this.data = null;
          console.error('Network error fetching users:', error);
        }
        // watchQuery subscription usually stays open, no need for complete
      });
  }

  // Method to fetch products when the button is clicked
  fetchProducts(): void {
    this.loading = true; // Set loading state
    this.error = null; // Clear previous errors
    this.data = null; // Clear previous data

    this.apollo
      .watchQuery({
        query: GET_PRODUCTS_QUERY, // Execute the products query
      })
      .valueChanges
      .subscribe({
        next: (result: ApolloQueryResult<any>) => {
          this.loading = result.loading;
          this.error = result.error;
          this.data = result.data; // Assign the entire data object

           if (result.error) {
             console.error('GraphQL error fetching products:', result.error);
          }
        },
        error: (error: any) => {
          this.loading = false;
          this.error = error;
          this.data = null;
          console.error('Network error fetching products:', error);
        }
         // watchQuery subscription usually stays open, no need for complete
      });
  }

  // Optional: Lifecycle hook to unsubscribe when the component is destroyed
  // ngOnDestroy(): void {
  //     // If using .subscribe, you should unsubscribe to prevent memory leaks
  //     // this.subscription.unsubscribe(); // Assuming you stored the subscription
  //     // For this simple PoC, we omit explicit unsubscribe for brevity, but be aware of it.
  // }
}
