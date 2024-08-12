import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEntitiesHeaderComponent } from './main-entities-header.component';

describe('MainEntitiesHeaderComponent', () => {
  let component: MainEntitiesHeaderComponent;
  let fixture: ComponentFixture<MainEntitiesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainEntitiesHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainEntitiesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
