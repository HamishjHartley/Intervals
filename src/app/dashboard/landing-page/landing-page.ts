import { Component, inject } from '@angular/core';
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  private router = inject(Router);

  navigateToWizard() {
    this.router.navigate(['/fitness-wizard']);
  }

}
