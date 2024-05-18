import { TestBed } from '@angular/core/testing';
import { MatchesService } from './match.service';
import { DataService } from '../../services/data.service';
import { TeamService } from '../teams/team.service';
import { Match } from '../../models/match.model';
import { Team } from '../../models/team.model';

describe('MatchesService', () => {
  let service: MatchesService;
  let dataService: DataService;
  let teamService: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MatchesService,
        { provide: DataService, useValue: jasmine.createSpyObj('DataService', ['saveItem', 'getItems']) },
        { provide: TeamService, useValue: jasmine.createSpyObj('TeamService', ['getTeams', 'updateTeam']) }
      ]
    });

    service = TestBed.inject(MatchesService);
    dataService = TestBed.inject(DataService);
    teamService = TestBed.inject(TeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});