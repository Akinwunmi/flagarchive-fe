import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostBinding,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

import { AppFooterComponent, AppHeaderComponent } from './components';
import { Language } from './models';
import { UserService } from './services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppFooterComponent, AppHeaderComponent, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);
  readonly #translate = inject(TranslateService);
  readonly #userService = inject(UserService);

  @HostBinding('class.no-footer') hideFooter = false;

  ngOnInit() {
    this.#translate.langs = Object.values(Language);
    this.#translate.setDefaultLang(Language.English);
    this.#userService
      .getUser()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(user => {
        this.#translate.use(user.language || Language.English);
      });

    this.#router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe(event => {
        this.hideFooter = event.snapshot.data?.['hideFooter'];
      });
  }
}
