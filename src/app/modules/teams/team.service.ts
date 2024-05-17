import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Team } from '../../models/team.model';
import { Match } from '../../models/match.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  teamData = JSON.parse(localStorage.getItem('teamsData')!) || [];

  constructor(private dataService:DataService) {}

  getTeams(): Team[] {
    return this.teamData;
  }

  setTeams(teams: any[]) {
    this.teamData = teams;    
    localStorage.setItem('teamsData', JSON.stringify(teams));
  }

  
}
