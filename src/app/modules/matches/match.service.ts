import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Match } from '../../models/match.model';
import { TeamService } from '../teams/team.service';
import { Team } from '../../models/team.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private equiposSubject = new BehaviorSubject<Team[]>([]);
  equipos$ = this.equiposSubject.asObservable();
  
  private matches: Match[] = [];
  private equipos: Team[]=[];

  constructor(private dataService: DataService,
    private teamService:TeamService
  ) {
    this.loadMatches();
   }

  addMatch(match: Match): void{
    match.idMatch = this.getNextId();    
    this.matches.push(match);
    this.dataService.saveItem('matches', match);
    this.actualizarTablaDePosiciones();    
  }

  notificarEquipos(equipos: Team[]){
    this.equiposSubject.next(equipos);
  }

  getMacthes(): Match[]{    
    this.equipos = this.dataService.getItems('teamsData');
    this.equiposSubject.next(this.equipos);
    return this.dataService.getItems('matches');
  }

  private loadMatches(): void{
    this.matches = JSON.parse(localStorage.getItem('matches') || '[]');
  }

  getNextId(): number{
    return this.matches.length >0 ? Math.max(...this.matches.map(match=> match.idMatch)) + 1: 1;
  }

  actualizarTablaDePosiciones(){
   this.equipos = this.dataService.getItems('teamsData');       
    this.equipos.sort((a, b) => {
      if (b.puntos === a.puntos) {
        return b.diferenciaGoles - a.diferenciaGoles;
      }
      return b.puntos - a.puntos;
    });
    this.equiposSubject.next(this.equipos);
    }  
}
