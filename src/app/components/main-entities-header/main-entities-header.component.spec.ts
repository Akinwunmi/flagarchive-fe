import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

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
      providers: [provideMockStore(), provideRouter([])],
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
