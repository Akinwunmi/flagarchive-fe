import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'app-flag-image',
  standalone: true,
  imports: [],
  templateUrl: './flag-image.component.html',
  styleUrl: './flag-image.component.scss'
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
