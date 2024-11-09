import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { FIREBASE_CONFIG } from './firebase.config';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
        provideFirestore(() => getFirestore()),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  function setup() {
    fixture.detectChanges();
  }

  it('should create the app', () => {
    setup();
    expect(app).toBeTruthy();
  });
});
