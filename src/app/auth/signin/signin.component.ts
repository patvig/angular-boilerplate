import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '@app/auth';
import { RegisterContext } from '@app/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@UntilDestroy()
@Component({
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  signInForm: FormGroup;
  isSubmitted = signal(false); // Signal pour l'état du formulaire
  private readonly _toast = inject(HotToastService);

  constructor(
    private fb: FormBuilder,
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
  ) {
    this.signInForm = this.fb.group(
      {
        nom: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // Vérifie si un champ a une erreur
  hasError(controlName: string, errorName: string): boolean {
    return this.signInForm.get(controlName)?.hasError(errorName) ?? false;
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.signInForm.valid) {
      this._authService
        .register(this.getRegisterContext())
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res) => {
            if (res) {
              this._toast
                .show('Creation de compte réussi, redirection vers la page de connection...', {
                  theme: 'snackbar',
                  icon: '✅',
                  position: 'bottom-center',
                  duration: 2000,
                })
                .afterClosed.subscribe(() => {
                  this._router.navigate(['/login']);
                });
            } else {
              this._toast.error('Echec de creation de compte', {
                theme: 'snackbar',
                icon: '⚠️',
                position: 'bottom-center',
              });
            }
          },
          error: (error) => {
            // Handle the error here
          },
        });

      this.isSubmitted.set(true);
    }
  }

  getPasswordStrength(): string {
    const password = this.signInForm.get('password')?.value || '';
    if (password.length < 6) return 'Faible';
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 'Fort';
    return 'Moyen';
  }

  getRegisterContext(): RegisterContext {
    return {
      nom: this.signInForm.value.nom,
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
    };
  }

  login(event) {
    event.preventDefault();
    this._router.navigate(['/login']);
  }
}
