import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ENTITY_STUB } from '../../mocks';

import { FlagImageComponent } from './flag-image.component';

describe('FlagImageComponent', () => {
  let component: FlagImageComponent;
  let fixture: ComponentFixture<FlagImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlagImageComponent);
    component = fixture.componentInstance;
  });

  function setup() {
    fixture.componentRef.setInput('src', ENTITY_STUB.imageUrl);
    fixture.componentRef.setInput('alt', ENTITY_STUB.translationKey);
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });
});
