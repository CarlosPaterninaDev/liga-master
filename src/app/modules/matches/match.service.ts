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
    this.equipos = this.teamService.getTeams();
    this.equiposSubject.next(this.equipos);
   }

  addMatch(match: Match): void{
    match.idMatch = new Date().getTime();    
    this.matches.push(match);
    this.dataService.saveItem('matches', match);
    this.actualizarTablaDePosiciones(match);
    this.equiposSubject.next(this.equipos);
  }

  getMacthes(): Match[]{
    return this.dataService.getItems('matches');
  }

  private loadMatches(): void{
    this.matches = JSON.parse(localStorage.getItem('matches') || '[]');
  }

  actualizarTablaDePosiciones(match: Match){
    const equipoLocal = this.equipos.find(eq=> eq.idTeam === match.team1.idTeam);
    const equipoVisitante = this.equipos.find(eq=> eq.idTeam === match.team2.idTeam);

    if(equipoLocal && equipoVisitante){
      equipoLocal.golesAFavor += match.golesTeam1;
      equipoLocal.golesEnContra += match.golesTeam2;
      equipoLocal.diferenciaGoles = equipoLocal.golesAFavor - equipoLocal.golesEnContra;

      equipoVisitante.golesAFavor += match.golesTeam2;
      equipoVisitante.golesEnContra += match.golesTeam1;
      equipoVisitante.diferenciaGoles = equipoVisitante.golesAFavor - equipoVisitante.golesEnContra;

      if (match.golesTeam1 > match.golesTeam2) {
        equipoLocal.puntos += 3;
      } else if (match.golesTeam1 < match.golesTeam2) {
        equipoVisitante.puntos += 3;
      } else {
        equipoLocal.puntos += 1;
        equipoVisitante.puntos += 1;
      }

      console.log(equipoLocal, equipoVisitante);

      this.teamService.updateTeam(equipoLocal);
      this.teamService.updateTeam(equipoVisitante);

      this.equipos.sort((a, b) => {
        if (b.puntos === a.puntos) {
          return b.diferenciaGoles - a.diferenciaGoles;
        }
        return b.puntos - a.puntos;
      });

    }
  }
}
