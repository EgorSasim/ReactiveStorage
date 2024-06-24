import { Component } from '@angular/core';
import { createSignalFromStorageRaw } from '../storage/storage.helpers';
import { ComponentBackground } from './test-component.typings';
import { SELECTED_BACKGROUND_STORAGE_KEY } from './test-component.constants';

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss',
})
export class TestComponent {
  public readonly selectedBackground1 =
    createSignalFromStorageRaw<ComponentBackground>(
      SELECTED_BACKGROUND_STORAGE_KEY
    );
  public readonly selectedBackground2 =
    createSignalFromStorageRaw<ComponentBackground>(
      SELECTED_BACKGROUND_STORAGE_KEY
    );

  public toggleBackground(): void {
    this.selectedBackground1.update((bg: ComponentBackground | null) =>
      bg === 'blue' ? 'red' : 'blue'
    );
  }

  public setBlueBackground(): void {
    this.selectedBackground2.update((bg: ComponentBackground | null) =>
      bg === 'blue' ? 'red' : 'blue'
    );
  }
}
