import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '@app/auth';
import { RegisterContext } from '@app/auth';
import { ActivatedRoute, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-signin',
  standalone: false,

  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  signInForm: FormGroup;
  isSubmitted = signal(false); // Signal pour l'état du formulaire

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
    this.isSubmitted.set(true);
    if (this.signInForm.valid) {
      console.log('Formulaire soumis :', this.signInForm.value);
    }

    this._authService
      .register(this.getRegisterContext())
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          if (res) {
            console.log('Register successful', res);
            this._router.navigate([this._route.snapshot.queryParams['redirect'] || '/login'], { replaceUrl: true }).then(() => {});
          }
        },
        error: (error) => {
          // Handle the error here
        },
      });
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
}
