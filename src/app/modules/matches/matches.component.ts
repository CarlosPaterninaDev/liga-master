import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Match } from '../../models/match.model';
import { MatchesService } from './match.service';
import { CrearMatchComponent } from './crear-match/crear-match.component';
import { SharedModule } from '../shared.module';
import { Team } from '../../models/team.model';
import { TeamService } from '../teams/team.service';
import { StandingsComponent } from './standings/standings.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [SharedModule, StandingsComponent],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export default class MatchesComponent {
  private equiposSubject = new BehaviorSubject<Team[]>([]);
  equipos$ = this.equiposSubject.asObservable();

  displayedColumns: string[] = ['equipo1', 'golesEquipo1', 'golesEquipo2', 'equipo2'];
  matches: Match[] ;
  equipos: Team[]=[];

  constructor(private dialog: MatDialog,
    private matchService: MatchesService,
    private teamService: TeamService){
      this.matches = this.matchService.getMacthes();
    }

  openAddMatchModal(): void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.height = "500px";
    // const dialogRef = this.dialog.open(DialogTeam, dialogConfig);

    const dialogRef = this.dialog.open(CrearMatchComponent,
      dialogConfig
    );    

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.matches = this.matchService.getMacthes();
        this.equipos = this.teamService.getTeams();        
      }
    });
  }

 


}
