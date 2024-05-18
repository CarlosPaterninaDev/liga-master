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
import { FormControl, FormGroup } from '@angular/forms';
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
  filtered = false;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

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

  // filterControl = new FormControl('');  

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

    this.range.valueChanges.subscribe((value) => {
      this.applyFilter();
      console.log(value);
    })
    
  }

  applyFilter() {

    console.log(this.dataSource);
    if(this.range.value.start && this.range.value.end){
      this.matches = this.matchService.getMacthes();
      this.dataSource = new MatTableDataSource(this.matches);
      console.log("data",this.dataSource.data);
      this.dataSource.data = this.dataSource.data.filter(e=> new Date(e.fechaPartido).getTime() >= this.range.value.start?.getTime()! && new Date(e.fechaPartido).getTime() <= this.range.value.end?.getTime()!);
      this.filtered = true;
    }
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeFilter(){
    this.filtered = false;
    this.matches = this.matchService.getMacthes();
    this.dataSource = new MatTableDataSource(this.matches);

    this.range.reset();

  }

  openAddMatchModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '65%';
    dialogConfig.height = '600px';

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
