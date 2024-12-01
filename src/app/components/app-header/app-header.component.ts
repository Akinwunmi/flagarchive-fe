import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FlagButtonDirective,
  FlagCardComponent,
  FlagDropdownDirective,
  FlagIconComponent,
  FlagListItemComponent,
  FlagPillComponent,
  PillType,
} from '@flagarchive/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService, UserService } from '../../services';
import { EntitiesStore } from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlagButtonDirective,
    FlagCardComponent,
    FlagDropdownDirective,
    FlagIconComponent,
    FlagListItemComponent,
    FlagPillComponent,
    TranslateModule,
  ],
  selector: 'app-header',
  styleUrl: './app-header.component.css',
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent {
  readonly #authService = inject(AuthService);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #router = inject(Router);
  readonly #userService = inject(UserService);

  menu = viewChild.required(FlagDropdownDirective);

  pillType = PillType;

  currentUser = this.#authService.currentUser;
  isAdmin = this.#userService.isAdmin;

  goToCreate() {
    this.#closeMenu();
    this.#router.navigate(['create']);
  }

  goToHome() {
    const id = 'af';

    this.#entitiesStore.updateSelectedEntityId(id);
    this.#router.navigate(['discover', 'entity', id]);
  }

  goToLogin() {
    this.#closeMenu();
    this.#router.navigate(['login']);
  }

  logOut() {
    this.#authService.logOut();
    this.#closeMenu();
    this.#router.navigate(['']);
  }

  #closeMenu() {
    this.menu().close();
  }
}
