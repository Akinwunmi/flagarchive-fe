import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ENTITY_STUB } from '../../mocks';

import { FormFieldInputComponent } from './form-field-input.component';

describe('FormFieldInputComponent', () => {
  let component: FormFieldInputComponent;
  let fixture: ComponentFixture<FormFieldInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormFieldInputComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldInputComponent);
    component = fixture.componentInstance;
  });

  function setup() {
    fixture.componentRef.setInput('control', new FormControl());
    fixture.componentRef.setInput('translationKey', ENTITY_STUB.translationKey);
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });
});
