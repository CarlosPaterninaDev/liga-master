import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  saveItem(key: string, item: any): void {
    let items = this.getItems(key);
    items.push(item);
    localStorage.setItem(key, JSON.stringify(items));
  }

  getItems(key: string): any[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
}
