import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationImplService } from '../../services/notification.service';
import LoginComponent from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let notificationService: NotificationImplService;
  let bottomSheet: MatBottomSheet;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule, LoginComponent],
      providers: [
        { provide: NotificationImplService, useValue: jasmine.createSpyObj('NotificationImplService', ['errorNotification']) },
        { provide: MatBottomSheet, useValue: jasmine.createSpyObj('MatBottomSheet', ['open']) }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationImplService);
    bottomSheet = TestBed.inject(MatBottomSheet);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error notification when credentials are invalid', () => {
    component.loginForm.setValue({ username: 'wrong', password: 'wrong' });
    component.signIn();
    expect(notificationService.errorNotification).toHaveBeenCalledWith('Credenciales inválidas, por favor intente de nuevo.');
  });

});