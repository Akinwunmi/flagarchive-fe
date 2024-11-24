import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbItem } from '@flagarchive/angular';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { FIREBASE_CONFIG } from '../../firebase.config';
import { ENTITIES_STUB } from '../../mocks';

import { EntityHeaderComponent } from './entity-header.component';

describe('EntityHeaderComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let component: EntityHeaderComponent;
  let fixture: ComponentFixture<EntityHeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EntityHeaderComponent,
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
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityHeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  function setup() {
    fixture.componentRef.setInput('entity', ENTITIES_STUB[0]);
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('should check window size', () => {
    setup();
    window.innerWidth = 500;
    component.onWindowResize();

    expect(component.isMobile).toBeTrue();
  });

  it('should navigate to entity', () => {
    const navigateSpy = router.navigate as jasmine.Spy;
    const item: BreadcrumbItem = {
      title: ENTITIES_STUB[0].translationKey,
      link: ENTITIES_STUB[0].id,
    };

    setup();
    component.goToEntity(item);

    expect(navigateSpy).toHaveBeenCalledWith([ENTITIES_STUB[0].id], { relativeTo: {} });
  });

  it('should navigate without a provided link', () => {
    const navigateSpy = router.navigate as jasmine.Spy;
    const item: BreadcrumbItem = {
      title: ENTITIES_STUB[0].translationKey,
    };

    setup();
    component.goToEntity(item);

    expect(navigateSpy).toHaveBeenCalledWith([], { relativeTo: {} });
  });

  it('should toggle state', () => {
    setup();
    component.toggleState();

    expect(component.isExpanded).toBeFalse();
  });
});
