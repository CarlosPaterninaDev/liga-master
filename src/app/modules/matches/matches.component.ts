import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Match } from '../../models/match.model';
import { MatchesService } from './match.service';
import { CrearMatchComponent } from './crear-match/crear-match.component';
import { SharedModule } from '../shared.module';
import { StandingsComponent } from './standings/standings.component';
import { Team } from '../../models/team.model';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [SharedModule, StandingsComponent],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export default class MatchesComponent implements OnInit {
  displayedColumns: string[] = ['equipo1', 'golesEquipo1', 'golesEquipo2', 'equipo2'];
  matches: Match[]; 
  teams: Team[];

  constructor(private dialog: MatDialog,
    private matchService: MatchesService,
    private dataService: DataService){
      this.matches = this.matchService.getMacthes();    
      this.teams = this.dataService.getItems('teamsData'); 
      this.matchService.actualizarTablaDePosiciones();
    }

    ngOnInit(): void {
      this.matchService.actualizarTablaDePosiciones();
    }

  openAddMatchModal(): void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.height = "700px";
    // const dialogRef = this.dialog.open(DialogTeam, dialogConfig);

    const dialogRef = this.dialog.open(CrearMatchComponent,
      dialogConfig
    );    

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.matches = this.matchService.getMacthes();
        this.matchService.actualizarTablaDePosiciones();
      }
    });
  }
}
