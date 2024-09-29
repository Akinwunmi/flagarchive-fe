import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearNavigatorComponent } from './year-navigator.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('YearNavigatorComponent', () => {
  let component: YearNavigatorComponent;
  let fixture: ComponentFixture<YearNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearNavigatorComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(YearNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
