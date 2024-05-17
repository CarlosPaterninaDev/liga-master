import { Team } from './team.model';

export interface Match{  
    idMatch: number;
    team1: Team;
    team2: Team;
    golesTeam1: number;
    golesTeam2: number; 
}