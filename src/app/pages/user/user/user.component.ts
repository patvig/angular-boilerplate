import { Component } from '@angular/core';
import { AuthenticationService, CredentialsService } from '@auth';

@Component({
  selector: 'app-user',
  standalone: false,

  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  currentUser = this.authService.currentUser();
  constructor(private authService: AuthenticationService) {}
}
