import { TestBed } from '@angular/core/testing';
import { TeamService } from './team.service';
import { Team } from '../../models/team.model';

describe('TeamService', () => {
  let service: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamService]
    });

    service = TestBed.inject(TeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a team', () => {
    const team: Team = { idTeam: 1, teamName: 'Test Team', golesAFavor: 0, golesEnContra: 0, diferenciaGoles: 0, puntos: 0};

    service.addteam(team);
    expect(service.getTeams()).toContain(team);
  });


  it('should get a team by id', () => {
    const team: Team = { idTeam: 2, teamName: 'Test Team', golesAFavor: 0, golesEnContra: 0, diferenciaGoles: 0, puntos: 0};
    service.addteam(team);
    expect(service.getTeamById(2)).toEqual(team);
  });

  it('should update a team', () => {
    const team: Team = { idTeam: 1, teamName: 'Test Team', golesAFavor: 0, golesEnContra: 0, diferenciaGoles: 0, puntos: 0};

    service.addteam(team);
    const updatedTeam: Team =  { idTeam: 1, teamName: 'Updated Team', golesAFavor: 0, golesEnContra: 0, diferenciaGoles: 0, puntos: 0};
    service.updateTeam(updatedTeam);
    expect(service.getTeamById(1)).toEqual(updatedTeam);
  });

  it('should remove a team', () => {
    const team: Team = { idTeam: 1, teamName: 'Test Team', golesAFavor: 0, golesEnContra: 0, diferenciaGoles: 0, puntos: 0};

    service.addteam(team);
    service.removeTeam(team);
    expect(service.getTeams()).not.toContain(team);
  });
});