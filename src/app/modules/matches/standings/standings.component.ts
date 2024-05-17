import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Team } from '../../../models/team.model';
import { TeamService } from '../../teams/team.service';
import { SharedModule } from '../../shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatchesService } from '../match.service';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './standings.component.html',
  styleUrl: './standings.component.scss'
})
export class StandingsComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'puntos', 'golesAFavor', 'golesEnContra', 'diferenciaGoles'];
  dataSource: MatTableDataSource<Team> = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor( private matchService: MatchesService){   }
  ngOnInit(): void {
    this.matchService.equipos$.subscribe(equipos=>{
      this.dataSource.data =equipos;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;  
    })
      
  }

}
