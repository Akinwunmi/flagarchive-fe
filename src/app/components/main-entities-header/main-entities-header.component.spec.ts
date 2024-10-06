import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { FIREBASE_CONFIG } from '../../firebase.config';
import { ENTITIES_STUB } from '../../mocks';
import { DiscoverSection, EntityType } from '../../models';

import { MainEntitiesHeaderComponent } from './main-entities-header.component';

describe('MainEntitiesHeaderComponent', () => {
  const mockRouter = {
    url: '/entity/as',
    navigate: jasmine.createSpy('navigate'),
    events: of(new NavigationEnd(0, '', '')),
  };
  let component: MainEntitiesHeaderComponent;
  let fixture: ComponentFixture<MainEntitiesHeaderComponent>;
  let router: Router;

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
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainEntitiesHeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  function setup() {
    const mainEntities = ENTITIES_STUB.filter(
      entity => entity.type === EntityType.Continent || entity.type === EntityType.Organization,
    );
    fixture.componentRef.setInput('mainEntities', mainEntities);
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

  it('should have organizations as active section', () => {
    setup();
    component.selectedMainEntityId.set('oi');

    expect(component.activeSection()).toEqual(DiscoverSection.Organizations);
  });

  it('should navigate when selecting main entity', () => {
    const navigateSpy = router.navigate as jasmine.Spy;

    setup();
    component.selectMainEntity('af');

    expect(navigateSpy).toHaveBeenCalledWith(['entity', 'af'], { relativeTo: {} });
  });
});
