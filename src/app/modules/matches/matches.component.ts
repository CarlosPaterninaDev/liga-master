import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Match } from '../../models/match.model';
import { MatchesService } from './match.service';
import { CrearMatchComponent } from './crear-match/crear-match.component';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export default class MatchesComponent {

  displayedColumns: string[] = ['equipo1', 'golesEquipo1', 'equipo2', 'golesEquipo2'];
  matches: Match[] ;

  constructor(private dialog: MatDialog,
    private matchService: MatchesService){
      this.matches = this.matchService.getMacthes();
    }

  openAddMatchModal(): void{
    const dialogRef = this.dialog.open(CrearMatchComponent,{
      width: '250px'
    });    

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.matches = this.matchService.getMacthes();
      }
    });
  }


}
