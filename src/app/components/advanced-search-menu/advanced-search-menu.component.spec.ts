import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { FlagCategory, Layout, SortDirection } from '../../models';

import { AdvancedSearchMenuComponent } from './advanced-search-menu.component';

describe('AdvancedSearchMenuComponent', () => {
  let component: AdvancedSearchMenuComponent;
  let fixture: ComponentFixture<AdvancedSearchMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdvancedSearchMenuComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvancedSearchMenuComponent);
    component = fixture.componentInstance;
  });

  function setup() {
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('should get the selected flag category label', () => {
    setup();
    component.updateFlagCategory(FlagCategory.Naval);
    const label = component.getSelectedFlagCategoryLabel();
    expect(label).toEqual(`ADVANCED_SEARCH.FLAG_CATEGORY.${FlagCategory.Naval.toUpperCase()}`);
  });

  it('should get the fallback flag category label', () => {
    setup();
    component.updateFlagCategory(null!);
    const label = component.getSelectedFlagCategoryLabel();
    expect(label).toEqual('COMMON.FLAG_CATEGORIES');
  });

  it('should update the layout options', () => {
    setup();
    component.updateLayout(Layout.List);
    const listLayout = component.layoutOptions().find(option => option.value === Layout.List);
    expect(listLayout?.active).toBeTrue();
  });

  it('should update the sort options', () => {
    setup();
    component.updateSortDirection(SortDirection.Desc);
    const descSortDirection = component
      .sortOptions()
      .find(option => option.value === SortDirection.Desc);
    expect(descSortDirection?.active).toBeTrue();
  });
});
