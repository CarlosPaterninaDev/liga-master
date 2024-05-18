import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CrearMatchComponent } from './crear-match.component';
import { MatchesService } from '../match.service';
import { TeamService } from '../../teams/team.service';
import { DataService } from '../../../services/data.service';
import { Team } from '../../../models/team.model';
import { Match } from '../../../models/match.model';

describe('CrearMatchComponent', () => {
  let component: CrearMatchComponent;
  let fixture: ComponentFixture<CrearMatchComponent>;
  let matchService: MatchesService;
  let dialogRef: MatDialogRef<CrearMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CrearMatchComponent],
      providers: [
        {
          provide: MatchesService,
          useValue: jasmine.createSpyObj('MatchesService', ['addMatch']),
        },
        {
          provide: TeamService,
          useValue: jasmine.createSpyObj('TeamService', ['getTeams']),
        },
        {
          provide: DataService,
          useValue: jasmine.createSpyObj('DataService', [
            'saveItem',
            'getItems',
          ]),
        },
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close']),
        },
      ],
    });

    fixture = TestBed.createComponent(CrearMatchComponent);
    component = fixture.componentInstance;
    matchService = TestBed.inject(MatchesService);
    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a match and close the dialog on submit', () => {
    const date = new Date();

    const match: Match = {
      idMatch: 0,
      team1: {
        idTeam: 1,
        teamName: 'Team 1',
        golesAFavor: 0,
        golesEnContra: 0,
        diferenciaGoles: 0,
        teamImage: '',
        puntos: 0,
      },
      team2: {
        idTeam: 2,
        teamName: 'Team 2',
        golesAFavor: 0,
        golesEnContra: 0,
        diferenciaGoles: 0,
        teamImage: '',
        puntos: 0,
      },
      golesTeam1: 1,
      golesTeam2: 0,
      fechaPartido: date,
    };
    component.matchForm.setValue({
      team1: {
        idTeam: 1,
        name: 'Team 1',
        teamImage: '',
        golesAFavor: 0,
        golesEnContra: 0,
        diferenciaGoles: 0,
        puntos: 0,
      },
      golesTeam1: 1,
      team2: {
        idTeam: 2,
        name: 'Team 2',
        teamImage: '',
        golesAFavor: 0,
        golesEnContra: 0,
        diferenciaGoles: 0,
        puntos: 0,
      },
      golesTeam2: 0,
      fechaPartido: date,
    });
    component.onSubmit();
    expect(matchService.addMatch).toHaveBeenCalled();
  });

  it('should close the dialog on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });
});
