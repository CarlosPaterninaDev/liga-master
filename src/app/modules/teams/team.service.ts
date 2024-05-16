import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  teamData = JSON.parse(localStorage.getItem('teamsData')!) || [];

  constructor() {}

  getTeams() {
    return this.teamData;
  }

  setTeams(teams: any[]) {
    this.teamData = teams;
    localStorage.setItem('teamsData', JSON.stringify(teams));
  }
}
