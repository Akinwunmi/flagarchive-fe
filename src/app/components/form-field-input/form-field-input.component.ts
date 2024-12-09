import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FlagInputComponent } from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagInputComponent, ReactiveFormsModule, TranslateModule],
  selector: 'app-form-field-input',
  templateUrl: './form-field-input.component.html',
})
export class FormFieldInputComponent {
  control = input.required<FormControl>();
  translationKey = input.required<string>();
  hasInfoMessage = input(false);
  required = input(false);
  type = input('text');

  id = crypto.randomUUID();
}
