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
  editItem(key: string, item: any): void {
    let items = this.getItems(key);
    const teamIndex = items.findIndex((team: any) => team.idTeam == item.idTeam);
    if (teamIndex > -1) {
      items[teamIndex] = item;
    } else {
      items.push(item);
    }
    localStorage.setItem(key, JSON.stringify(items));
  }
  deleteItem(key: string, item: any): void {
    let items = this.getItems(key);
    items = items.filter((team: any) => team.idTeam != item.idTeam)
    localStorage.setItem(key, JSON.stringify(items));
  }

  getItems(key: string): any[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
}
