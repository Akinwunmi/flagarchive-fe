import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { selectYear } from '../../state/selectors';

import { YearNavigatorComponent } from './year-navigator.component';

describe('YearNavigatorComponent', () => {
  let component: YearNavigatorComponent;
  let fixture: ComponentFixture<YearNavigatorComponent>;
  let store: MockStore;
  let mockSelectYear: MemoizedSelector<object, number>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearNavigatorComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(YearNavigatorComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  function setup() {
    const currentYear = new Date().getFullYear();
    fixture.componentRef.setInput('max', currentYear);
    fixture.componentRef.setInput('min', 2019);
    mockSelectYear = store.overrideSelector(selectYear, currentYear);
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('should have 2021 as selected year', () => {
    setup();
    mockSelectYear.setResult(2021);
    store.refreshState();
    expect(component.selectedYear).toBe(2021);
  });

  it('should decrease selected year by 1', () => {
    setup();
    mockSelectYear.setResult(2021);
    component.previous();
    // ! This is a false positive, the selector is now manually updated
    mockSelectYear.setResult(2020);
    store.refreshState();
    expect(component.selectedYear).toBe(2020);
  });

  it('should increase selected year by 1', () => {
    setup();
    mockSelectYear.setResult(2021);
    component.next();
    // ! This is a false positive, the selector is now manually updated
    mockSelectYear.setResult(2022);
    store.refreshState();
    expect(component.selectedYear).toBe(2022);
  });

  it('should play and stop', () => {
    setup();
    expect(component.isPlaying()).toBeFalse();
    component.play();
    expect(component.isPlaying()).toBeTrue();
    component.stop();
    expect(component.isPlaying()).toBeFalse();
  });

  it('should stop when max year is reached', fakeAsync(() => {
    setup();
    mockSelectYear.setResult(2021);
    store.refreshState();
    fixture.componentRef.setInput('max', 2021);
    component.play();
    tick(750);
    expect(component.isPlaying()).toBeFalse();
  }));

  it('should stop when min year is reached', fakeAsync(() => {
    setup();
    mockSelectYear.setResult(2021);
    store.refreshState();
    fixture.componentRef.setInput('min', 2021);
    component.play(true);
    tick(750);
    expect(component.isPlaying()).toBeFalse();
  }));

  it('should set dropdown state', () => {
    setup();
    component.setDropdownState();
    expect(component.dropdownIsOpen).toBeTrue();
    expect(component.isPlaying()).toBeFalse();
  });
});
