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

  addteam(team: Team) {
    this.teamData.push(team);
    this.setTeams(this.teamData)
  }

  getTeamById(id: number): Team {
    return this.teamData.find((team: Team) => team.idTeam === id);
  }

  updateTeam(team: Team) {
    const teamIndex = this.teamData.findIndex((t: Team) => t.idTeam === team.idTeam);
    if (teamIndex > -1) {
      this.teamData[teamIndex] = team;
    }
    this.setTeams(this.teamData)
  }

  removeTeam(team: Team) {
    this.teamData = this.teamData.filter((t: Team) => t.idTeam !== team.idTeam);
    this.setTeams(this.teamData)
  }

}
