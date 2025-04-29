// src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for standalone components
// Removed: import { RouterOutlet } from '@angular/router'; // No longer needed as it's not used

// Import the standalone DataFetcherComponent
import { DataFetcherComponent } from './data-fetcher/data-fetcher.component';

@Component({
  selector: 'app-root', // The root component selector
  standalone: true, // Mark AppComponent as standalone
  // Import CommonModule and our DataFetcherComponent
  imports: [CommonModule, DataFetcherComponent], // Removed RouterOutlet from imports
  templateUrl: './app.component.html', // Link to the component's HTML template
  styleUrl: './app.component.css' // Link to the component's CSS file
})
export class AppComponent {
  // The default title property (you can remove or change this if not needed)
  title = 'angular-client';
}
