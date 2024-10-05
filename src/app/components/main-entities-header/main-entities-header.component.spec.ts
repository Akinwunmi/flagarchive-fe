import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { FIREBASE_CONFIG } from '../../firebase.config';

import { MainEntitiesHeaderComponent } from './main-entities-header.component';

describe('MainEntitiesHeaderComponent', () => {
  let component: MainEntitiesHeaderComponent;
  let fixture: ComponentFixture<MainEntitiesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainEntitiesHeaderComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useValue: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
        provideFirestore(() => getFirestore()),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainEntitiesHeaderComponent);
    component = fixture.componentInstance;
  });

  function setup() {
    fixture.componentRef.setInput('mainEntities', []);
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });
});
