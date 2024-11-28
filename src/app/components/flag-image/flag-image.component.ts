import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { FlagIconComponent } from '@flagarchive/angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.hoisted-right]': 'hoistedRight()',
    '[class.reversed]': 'isReversed()',
  },
  imports: [FlagIconComponent],
  selector: 'app-flag-image',
  standalone: true,
  styleUrl: './flag-image.component.css',
  templateUrl: './flag-image.component.html',
})
export class FlagImageComponent {
  src = input.required<string>();
  alt = input.required<string>();
  hoistedRight = input(false);
  isReversed = input(false);
  placeholder = input(false);

  #placeholderClass = this.placeholder();

  @HostBinding('class.placeholder')
  get placeholderClass(): boolean {
    return this.#placeholderClass;
  }

  handleImageError() {
    this.#placeholderClass = true;
  }

  handleImageLoad() {
    this.#placeholderClass = false;
  }
}
