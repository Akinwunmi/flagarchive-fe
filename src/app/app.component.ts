import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppHeaderComponent } from './components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppHeaderComponent, RouterOutlet],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {}
