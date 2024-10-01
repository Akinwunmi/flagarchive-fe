import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  function setup() {
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('should validate entities', () => {
    setup();
    component.validate({ target: { value: '[]' } } as unknown as Event);
    expect(component.isValid).toBe(true);
  });

  it('should not validate entities', () => {
    setup();
    component.validate({ target: { value: 'invalid' } } as unknown as Event);
    expect(component.isValid).toBe(false);
  });

  it('should upload entities', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.form.get('entities')!.setValue('[]');
    setup();
    component.upload();
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
