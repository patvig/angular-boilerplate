import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';

@UntilDestroy()
@Component({
  selector: 'app-resetpassword',
  standalone: false,
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss',
})
export class ResetpasswordComponent {
  resetPasswordForm: FormGroup;
  isSubmitted = signal(false); // Signal pour l'état du formulaire
  private readonly _toast = inject(HotToastService);

  constructor(
    private fb: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Vérifie si un champ a une erreur
  hasError(controlName: string, errorName: string): boolean {
    return this.resetPasswordForm.get(controlName)?.hasError(errorName) ?? false;
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.resetPasswordForm.valid) {
      console.log('this.email', this.resetPasswordForm.get('email'));

      this._authService
        .resetPassword({
          email: this.resetPasswordForm.value.email,
        })
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res) => {
            this._toast.error(res.message, {
              theme: 'snackbar',
              icon: '✅',
              position: 'bottom-center',
            });
          },
          error: (error) => {
            // Handle the error here
          },
        });
      this.isSubmitted.set(true);
    }
  }

  login(event) {
    event.preventDefault();
    this._router.navigate(['/login']);
  }
}
