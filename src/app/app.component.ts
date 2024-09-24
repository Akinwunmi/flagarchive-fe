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
import { UserService } from './services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppFooterComponent, AppHeaderComponent, RouterOutlet],
  selector: 'app-root',
  standalone: true,
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
    this.#translate.setDefaultLang('en');
    this.#userService.getUser().subscribe(user => {
      this.#translate.use(user.language || 'en');
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
