import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { FIREBASE_CONFIG } from '../../firebase.config';
import { AuthService } from '../../services';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let authService: AuthService;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
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
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  function setup() {
    fixture.detectChanges();
  }
  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('should navigate after successful log in', fakeAsync(() => {
    spyOn(authService, 'logIn').and.returnValue(of('success'));
    const navigateSpy = router.navigate as jasmine.Spy;
    setup();
    component.logIn();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  }));
});
