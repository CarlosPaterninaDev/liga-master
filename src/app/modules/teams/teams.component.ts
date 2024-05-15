
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
type ActionType = 'new' | 'edit' | 'delete';
@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTreeModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTabsModule,
    CdkTreeModule,
    DragDropModule,
    MatProgressBarModule,
    MatSortModule,
    MatRadioModule,MatSnackBarModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export default class TeamsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['teamName','EscudoUrl', 'actions'];
  class: string = ""
  title: string = "Listado de equipos"
  pageSizeOptions: number[] = [10, 20, 50, 100]
  description: string = "Seleccione un registro para modificar"
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  static switch: any = 0;
  dataSource: any = [];
  constructor(private dialog: MatDialog) { }
  ngOnInit() {

    this.loadExistingTeams();
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  loadExistingTeams() {
    this.dataSource = new MatTableDataSource<any>(JSON.parse(localStorage.getItem('teamsData')!) || []);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialogTeam(data: any, action: any) {
    const dialogConfig = new MatDialogConfig();
    data.action = action;
    dialogConfig.data = data;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '57%';
    dialogConfig.height = "fit-content";
    const dialogRef = this.dialog.open(DialogTeam, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (TeamsComponent.switch == 1) {
        this.ngOnInit();
      }
      TeamsComponent.switch = 0;
    });
  }
  static changeValueDialog(value: any) {
    this.switch = value

  }
}
@Component({
  selector: 'DialogTeam',
  templateUrl: './DialogTeam.html',
  styleUrls: ['./teams.component.scss'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTreeModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTabsModule,
    CdkTreeModule,
    DragDropModule,
    MatProgressBarModule,
    MatSortModule,
    MatRadioModule,MatSnackBarModule]  // Asumiendo que usas botones en el diáEscudo
})
export class DialogTeam implements OnInit {
  @ViewChild(TeamsComponent) team: TeamsComponent | undefined;
  actions = {
    new: 'Guardar',
    edit: 'Actualizar',
    delete: 'Eliminar',
  };
  action: ActionType;
  title: any = null;
  form: FormGroup
  teamData: any = []
  previewUrl: any = null;
  constructor(
    public dialogRef: MatDialogRef<DialogTeam>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      teamId: [null]
    });
    this.action = data.action;
    this.loadExistingTeams();
  }
  ngOnInit() {
    this.action = this.data?.action;
    switch (this.action) {
      case 'new':
        this.title = 'Guardar equipo';
        break;
      case 'edit':
        this.title = 'Editar equipo';
        this.form.setValue({
          name: this.data.teamName,
          teamId: this.data.teamId
        })
        this.previewUrl=this.data.EscudoUrl
        break;
      case 'delete':
        this.title = 'Eliminar equipo';
        break;
    }
  }
  dialogClose() {
    this.dialogRef.close();
  }
  create() {
    if (this.action == 'new' || this.action == 'edit') {
      if (this.form.valid) {
        if (this.action == 'new') {
          try {
            const teamData = {
              teamName: this.form.value.name,
              EscudoUrl: this.previewUrl,
              teamId:  new Date().getTime()
            };
            this.teamData.push(teamData)
            localStorage.setItem('teamsData', JSON.stringify(this.teamData))
            this.openSnackBar("Equipo guardado con exito", "Cerrar",'success');
            TeamsComponent.changeValueDialog(1)
            this.dialogClose();
          } catch (error) {
            this.openSnackBar("Error al guardar equipo", "Cerrar",'error');
          }

        } else {
          try {
            const teamIndex = this.teamData.findIndex((team: any) => team.teamId == this.data.teamId);
            const teamData = {
              teamName: this.form.value.name,
              EscudoUrl: this.previewUrl,
              teamId:this.form.value.teamId
            };
            if (teamIndex > -1) {
              this.teamData[teamIndex] = teamData; // Update existing team
              localStorage.setItem('teamsData', JSON.stringify(this.teamData));
              this.openSnackBar("Equipo actualizado con exito", "Cerrar",'success');
              TeamsComponent.changeValueDialog(1)
              this.dialogClose();
            }
          } catch (error) {
            this.openSnackBar("Error al actualizar equipo", "Cerrar",'error');
          }
        }
      } else {
        this.openSnackBar("Todos los campos son obligatorios", "Cerrar",'error');
      }
    } else {
      try {
        this.teamData = this.teamData.filter((team: any) => team.teamId != this.data.teamId)
        localStorage.setItem('teamsData', JSON.stringify(this.teamData));
        this.openSnackBar("Equipo eliminado con exito", "Cerrar",'success');
        TeamsComponent.changeValueDialog(1)
        this.dialogClose();
      } catch (error) {
        this.openSnackBar("Error al eliminar equipo", "Cerrar",'error');
      }
    }
  }
  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element && element.files && element.files.length) {
      const file = element.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      // Manejo en caso de que no haya archivos, podrías configurar un mensaje de error, etc.
      console.log('No file selected');
    }
  }
  loadExistingTeams() {
    this.teamData = JSON.parse(localStorage.getItem('teamsData')!) || [];  }
  openSnackBar(message: string, action: string,type:string) {
    this.snackBar.open(message, action, {
      duration: 300000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type
    });
  }
}
