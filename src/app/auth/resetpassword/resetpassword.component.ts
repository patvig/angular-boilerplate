import { Component, signal, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-resetpassword',
  standalone: false,
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss',
})
export class ResetpasswordComponent {
  resetPasswordForm: FormGroup;
  isSubmitted = signal(false);
  private readonly _toast = inject(HotToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  token = '';
  email = '';

  constructor(
    private fb: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.token = params['token'];
      this.email = params['email'];
    });
  }

  // Vérifie si un champ a une erreur
  hasError(controlName: string, errorName: string): boolean {
    return this.resetPasswordForm.get(controlName)?.hasError(errorName) ?? false;
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this._authService
        .resetPassword({
          password: this.resetPasswordForm.value.password,
          token: this.token,
          email: this.email,
        })
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res) => {
            this._toast
              .show('Mot de passe modifié, redirection vers la page de connection...', {
                theme: 'snackbar',
                icon: '✅',
                position: 'bottom-center',
                duration: 2000,
              })
              .afterClosed.subscribe(() => {
                this._router.navigate(['/login']);
              });
          },
          error: (error) => {
            // Handle the error here
          },
        });
      this.isSubmitted.set(true);
    }
  }
}
