import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthenticationService, CredentialsService } from '@auth';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  menuHidden = false;
  currentUser = this.authService.currentUser;
  constructor(private authService: AuthenticationService) {}
}
