import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AppFooterComponent, AppHeaderComponent } from './components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppFooterComponent, AppHeaderComponent, RouterOutlet],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  readonly #translate = inject(TranslateService);

  ngOnInit() {
    this.#translate.setDefaultLang('en');
  }
}
