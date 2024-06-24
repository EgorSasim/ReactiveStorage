import { Injectable, InjectionToken, inject } from '@angular/core';

export const WEB_STORAGE_TOKEN = new InjectionToken<Storage>(
  'WEB_STORAGE_TOKEN'
);

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly storage = inject(WEB_STORAGE_TOKEN);

  public getItem<T>(key: string): T | null {
    const stroageRaw = this.storage.getItem(key);
    return stroageRaw === null ? null : (JSON.parse(stroageRaw) as T);
  }

  public setItem<T>(key: string, value: T | null): void {
    const stringified = JSON.stringify(value);
    this.storage.setItem(key, stringified);

    const storageEvent = new StorageEvent('storage', {
      key,
      newValue: stringified,
      storageArea: this.storage,
    });

    window.dispatchEvent(storageEvent);
  }
}
