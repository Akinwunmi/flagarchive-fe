import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FormFieldInputComponent } from '../../components';
import { TranslationKeyPipe } from '../../pipes';
import { AuthService } from '../../services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormFieldInputComponent, ReactiveFormsModule, TranslateModule, TranslationKeyPipe],
  selector: 'app-login',
  standalone: true,
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly #authService = inject(AuthService);
  readonly #fb = inject(FormBuilder);
  readonly #router = inject(Router);

  errorMessage = signal<string | null>(null);

  form = this.#fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  getControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  logIn() {
    const { email, password } = this.form.getRawValue();
    this.#authService.logIn(email, password).subscribe({
      next: () => {
        this.#router.navigate(['']);
      },
      error: error => {
        this.errorMessage.set(error.code);
      },
    });
  }
}
