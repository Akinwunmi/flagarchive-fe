import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { FIREBASE_CONFIG } from '../../firebase.config';

import { CreateComponent } from './create.component';
import { EntitiesStore } from '../../state';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let entitiesStore: any; // ! Find the correct type

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
      providers: [
        provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
        provideFirestore(() => getFirestore()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    entitiesStore = TestBed.inject(EntitiesStore);
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
    const addEntitiesSpy = spyOn(entitiesStore, 'addEntities');
    component.form.get('entities')!.setValue('[]');
    setup();
    component.upload();
    expect(addEntitiesSpy).toHaveBeenCalled();
  });
});
