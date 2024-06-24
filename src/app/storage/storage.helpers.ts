import {
  DestroyRef,
  WritableSignal,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { StorageService } from './storage.service';

export function createSignalFromStorageRaw<T>(
  storageKey: string
): WritableSignal<T | null> {
  const storage = inject(StorageService);

  const fromStorageSignal = signal<T | null>(storage.getItem<T>(storageKey));

  const writeToStorageOnUpdate = effect(() => {
    const updated = fromStorageSignal();
    untracked(() => storage.setItem(storageKey, updated));
  });

  const storageEventTracker = (event: StorageEvent) => {
    if (event.key === storageKey) {
      return;
    }

    const currVal = fromStorageSignal();
    const newVal = storage.getItem<T>(storageKey);

    if (currVal !== newVal) {
      fromStorageSignal.set(newVal);
    }
  };

  window.addEventListener('storage', storageEventTracker);

  inject(DestroyRef).onDestroy(() => {
    window.removeEventListener('storage', storageEventTracker);
  });

  return fromStorageSignal;
}
