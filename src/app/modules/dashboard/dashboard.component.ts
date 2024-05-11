import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, MatSidenavModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent {

}
