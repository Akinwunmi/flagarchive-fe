import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ENTITY_STUB } from '../../mocks';

import { EntityHeaderComponent } from './entity-header.component';

describe('EntityHeaderComponent', () => {
  let component: EntityHeaderComponent;
  let fixture: ComponentFixture<EntityHeaderComponent>;

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
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityHeaderComponent);
    component = fixture.componentInstance;
  });

  function setup() {
    fixture.componentRef.setInput('entity', ENTITY_STUB);
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });
});
