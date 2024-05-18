import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import  MatchesComponent  from './matches.component';
import { MatchesService } from './match.service';
import { TeamService } from '../teams/team.service';
import { Match } from '../../models/match.model';
import { Team } from '../../models/team.model';

describe('MatchesComponent', () => {
  let component: MatchesComponent;
  let fixture: ComponentFixture<MatchesComponent>;
  let matchService: MatchesService;
  let teamService: TeamService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatchesComponent],
  
      providers: [
        { provide: MatchesService, useValue: jasmine.createSpyObj('MatchesService', ['getMacthes']) },
        { provide: TeamService, useValue: jasmine.createSpyObj('TeamService', ['getTeams']) },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: MatSort, useValue: jasmine.createSpyObj('MatSort', ['']) },
        { provide: MatPaginator, useValue: jasmine.createSpyObj('MatPaginator', ['']) }
      ]
    });

    fixture = TestBed.createComponent(MatchesComponent);
    component = fixture.componentInstance;
    matchService = TestBed.inject(MatchesService);
    teamService = TestBed.inject(TeamService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should apply filter', () => {
    const start = new Date();
    const end = new Date();
    component.range.setValue({ start, end });
    component.applyFilter();
    expect(component.filtered).toBe(true);
  });

  it('should remove filter', () => {
    component.removeFilter();
    expect(component.filtered).toBe(false);
  });

});