import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Match } from '../../models/match.model';
import { MatchesService } from './match.service';
import { CrearMatchComponent } from './crear-match/crear-match.component';
import { SharedModule } from '../shared.module';
import { Team } from '../../models/team.model';
import { TeamService } from '../teams/team.service';
import { StandingsComponent } from './standings/standings.component';
import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [SharedModule, StandingsComponent],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss',
})
export default class MatchesComponent implements OnInit {
  private equiposSubject = new BehaviorSubject<Team[]>([]);
  equipos$ = this.equiposSubject.asObservable();
  dataSource!: MatTableDataSource<Match>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'equipo1',
    'golesEquipo1',
    'golesEquipo2',
    'equipo2',
    'fechaPartido'
  ];
  matches: Match[];
  equipos: Team[] = [];

  filterControl = new FormControl('');  

  constructor(
    private dialog: MatDialog,
    private matchService: MatchesService,
    private teamService: TeamService
  ) {
    this.matches = this.matchService.getMacthes();
    this.dataSource = new MatTableDataSource(this.matches);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    
    this.filterControl.valueChanges.subscribe(value => {
      this.applyFilter(value!);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openAddMatchModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.height = '600px';
    // const dialogRef = this.dialog.open(DialogTeam, dialogConfig);

    const dialogRef = this.dialog.open(CrearMatchComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.matches = this.matchService.getMacthes();
        this.equipos = this.teamService.getTeams();
        this.dataSource.data = this.matches;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
