import { Component, OnInit } from '@angular/core';
import { Match } from '../../../models/match.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatchesService } from '../match.service';
import { SharedModule } from '../../shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../../models/team.model';
import { TeamService } from '../../teams/team.service';
import { DataService } from '../../../services/data.service';


@Component({
  selector: 'app-crear-match',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './crear-match.component.html',
  styleUrl: './crear-match.component.scss'
})
export class CrearMatchComponent implements OnInit {
  matchForm: FormGroup;
  teams: Team[] = [];
  filteredTeams1: Team[] = [];
  filteredTeams2: Team[] = [];
  imageTeam1=null;
  imageTeam2=null;
  constructor(public dialogRef: MatDialogRef<CrearMatchComponent>,
    private matchService: MatchesService,
    private fb: FormBuilder,
    private teamService: TeamService,
    private dataService: DataService
  ) {
    this.matchForm = this.fb.group({
      team1: [null, Validators.required],
      golesTeam1: [0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]],
      team2: [null, Validators.required],
      golesTeam2: [0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]]      

    });
  }
  ngOnInit(): void {

    this.teams = this.dataService.getItems('teamsData');
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


  onSubmit(): void {
    if (this.matchForm.valid) {      
      const matchData: Match = {
        idMatch: 0,
        team1: {
          idTeam: this.matchForm.get('team1')?.value.idTeam, teamName: this.matchForm.get('team1')?.value.teamName,
          teamImage: this.matchForm.get('team1')?.value.teamImage,
          golesAFavor: this.matchForm.value.golesTeam1, golesEnContra: this.matchForm.value.golesTeam2, 
          diferenciaGoles: this.matchForm.value.golesTeam1-this.matchForm.value.golesTeam2 , puntos: 0
        },
        golesTeam1: this.matchForm.value.golesTeam1,
        team2: {
          idTeam: this.matchForm.get('team2')?.value.idTeam, teamName: this.matchForm.get('team2')?.value.teamName,
          teamImage: this.matchForm.get('team2')?.value.teamImage,
          golesAFavor: this.matchForm.value.golesTeam2, golesEnContra: this.matchForm.value.golesTeam1,
          diferenciaGoles: this.matchForm.value.golesTeam2 - this.matchForm.value.golesTeam1, puntos: 0
        },
        golesTeam2: this.matchForm.value.golesTeam2
      }

      let equipoLocal = this.teams.find(eq=> eq.idTeam === matchData.team1.idTeam);
      let equipoVisitante = this.teams.find(eq=> eq.idTeam === matchData.team2.idTeam);

      if(equipoLocal && equipoVisitante){
        equipoLocal.golesAFavor += matchData.golesTeam1;
        equipoLocal.golesEnContra += matchData.golesTeam2;
        equipoLocal.diferenciaGoles +=  matchData.golesTeam1 -  matchData.golesTeam2;
  
        equipoVisitante.golesAFavor += matchData.golesTeam2;
        equipoVisitante.golesEnContra += matchData.golesTeam1;
        equipoVisitante.diferenciaGoles += matchData.golesTeam2 - matchData.golesTeam1;
      }

      if (matchData.golesTeam1 > matchData.golesTeam2) {
        equipoLocal!.puntos += 3;
      } else if (matchData.golesTeam1 < matchData.golesTeam2) {
        equipoVisitante!.puntos += 3;
      } else {
        equipoLocal!.puntos += 1;
        equipoVisitante!.puntos += 1;
      }

      this.dataService.editItem('teamsData',equipoLocal);
      this.dataService.editItem('teamsData',equipoVisitante);
      this.matchService.addMatch(matchData)
      this.dialogRef.close(matchData)
    }

  }
  showImage(e:any, team:string) {
    console.log('sii',e);
    if (team=='team1'){
        this.imageTeam1=e.teamImage
    }else{
      this.imageTeam2=e.teamImage
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
