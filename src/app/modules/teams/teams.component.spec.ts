import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogTeam } from './teams.component';
import  TeamsComponent from './teams.component';

import { TeamService } from './team.service';

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;
  let teamService: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TeamsComponent, DialogTeam],
      providers: [
        { provide: TeamService, useValue: jasmine.createSpyObj('TeamService', ['getTeams']) },
        { provide: MatPaginator, useValue: jasmine.createSpyObj('MatPaginator', ['firstPage']) },
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['open', 'afterClosed']) },
        { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    });

    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    teamService = TestBed.inject(TeamService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

describe('DialogTeam', () => {
  let component: DialogTeam;
  let fixture: ComponentFixture<DialogTeam>;
  let teamService: TeamService;
  let dialogRef: MatDialogRef<DialogTeam>;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TeamsComponent, DialogTeam],
      providers: [
        { provide: TeamService, useValue: jasmine.createSpyObj('TeamService', ['getTeams', 'addteam', 'getTeamById', 'updateTeam', 'removeTeam']) },
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close']) },
        { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    });

    fixture = TestBed.createComponent(DialogTeam);
    component = fixture.componentInstance;
    teamService = TestBed.inject(TeamService);
    dialogRef = TestBed.inject(MatDialogRef);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests for DialogTeam here...
});