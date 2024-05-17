import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CodeInputModule, CodeInputComponent } from 'angular-code-input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NotificationImplService } from '../../services/notification.service';

@Component({
  selector: 'app-code-otp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    NgIf,
    MatInputModule,
    MatButtonModule,
    CodeInputModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './code-otp.component.html',
  styleUrl: './code-otp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeOtpComponent {
  @ViewChild(CodeInputComponent, { static: true })
  ngOtpInput!: CodeInputComponent;
  fb = inject(FormBuilder);
  router = inject(Router);
  private _bottomSheet = inject(MatBottomSheet);
  public notificationService = inject(NotificationImplService);

  codeForm: FormGroup = this.fb.group({
    code: ['', Validators.required],
  });

  login() {}

  onCodeCompleted(value: string) {
    if (value !== '1111') {
      this.notificationService.errorNotification(
        'Código incorrecto, por favor intente de nuevo.'
      );
      this.ngOtpInput.reset();
    } else {
      this.notificationService.successNotification(
        'Bienvenido',
        'Ingresa el código de verificación.'
      );
      this._bottomSheet.dismiss();
      setTimeout(() => {
        localStorage.setItem('token', '12345');
        this.router.navigate(['/dashboard']);
      }, 1500);
    }
  }
}
