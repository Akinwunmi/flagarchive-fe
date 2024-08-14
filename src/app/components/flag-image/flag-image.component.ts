import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-flag-image',
  standalone: true,
  styleUrl: './flag-image.component.scss',
  templateUrl: './flag-image.component.html',
})
export class FlagImageComponent {
  src = input.required<string>();
  alt = input.required<string>();
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
