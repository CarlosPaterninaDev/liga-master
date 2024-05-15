import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Match } from '../../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private matches: Match[] = [];

  constructor(private dataService: DataService) {
    this.loadMatches();
   }

  

  addMatch(match: Match): void{
    match.idMatch = this.getNextId();
    this.matches.push(match);
    this.dataService.saveItem('matches', match);
  }

  getMacthes(): Match[]{
    return this.dataService.getItems('matches');
  }

  private loadMatches(): void{
    this.matches = JSON.parse(localStorage.getItem('matches') || '[]');
  }

  getNextId(): number{
    return this.matches.length >0 ? Math.max(...this.matches.map(match=> match.idMatch)) + 1: 1;
  }
}
