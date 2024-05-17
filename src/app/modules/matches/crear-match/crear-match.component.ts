import { Component, OnInit } from '@angular/core';
import { Match } from '../../../models/match.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatchesService } from '../match.service';
import { SharedModule } from '../../shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../../models/team.model';
import { TeamService } from '../../teams/team.service';


@Component({
  selector: 'app-crear-match',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './crear-match.component.html',
  styleUrl: './crear-match.component.scss'
})
export class CrearMatchComponent implements OnInit  {
  matchForm: FormGroup ;
  teams: Team[] =[];
  filteredTeams1: Team[] = [];
  filteredTeams2: Team[] = [];

  constructor(public dialogRef: MatDialogRef<CrearMatchComponent>,
    private matchService: MatchesService,
    private fb: FormBuilder,
    private teamService: TeamService
  ){
    this.matchForm = this.fb.group({
      team1: [null, Validators.required],
      golesTeam1: [0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$') ]],
      team2: [null, Validators.required],
      golesTeam2: [0,[Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]]
    });    
  }
  ngOnInit(): void {

    this.teams = this.teamService.getTeams();
console.log(this.teams);
    this.filteredTeams1 = [...this.teams];
    this.filteredTeams2 = [...this.teams];
    this.onChanges();
  }
  
  onChanges(): void {
    this.matchForm.get('team1')?.valueChanges.subscribe(val => {
      this.filteredTeams2 = this.teams.filter(t => t.idTeam !== val.idTeam);
    });

    this.matchForm.get('team2')?.valueChanges.subscribe(val => {
      this.filteredTeams1 = this.teams.filter(t => t.idTeam !== val.idTeam);
    });
  }


  onSubmit(): void{
    if(this.matchForm.valid){
      const matchData: Match = {
        idMatch: 0,
        team1:{ idTeam:this.matchForm.get('team1')?.value.idTeam, teamName: this.matchForm.get('team1')?.value.teamName, 
        golesAFavor: 0, golesEnContra:0, diferenciaGoles:0, puntos:0},
        golesTeam1: this.matchForm.value.golesTeam1,
        team2: {idTeam:this.matchForm.get('team2')?.value.idTeam, teamName: this.matchForm.get('team2')?.value.teamName,
        golesAFavor: 0, golesEnContra:0, diferenciaGoles:0, puntos:0
        },
        golesTeam2: this.matchForm.value.golesTeam2
      }
      this.matchService.addMatch(matchData)
      this.dialogRef.close(matchData)
    }

  }

  onCancel(): void{
    this.dialogRef.close(false);
  }

}
