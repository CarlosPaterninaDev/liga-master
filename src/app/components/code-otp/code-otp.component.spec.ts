import { TestBed } from '@angular/core/testing';
import { CodeOtpComponent } from './code-otp.component';
import { NotificationImplService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { CodeInputComponent, CodeInputModule } from 'angular-code-input';

describe('OtpComponent', () => {
  let component: CodeOtpComponent;
  let ngOtpInput!: CodeInputComponent;
  let notificationService: NotificationImplService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CodeInputModule],
      providers: [
        CodeOtpComponent,
        {
          provide: NotificationImplService,
          useValue: jasmine.createSpyObj('NotificationService', [
            'errorNotification',
            'successNotification',
          ]),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    });

    component = TestBed.inject(CodeOtpComponent);
    notificationService = TestBed.inject(NotificationImplService);
    router = TestBed.inject(Router);
  });

  it('should call successNotification and navigate to dashboard when the code is 1111', (done) => {
    component.onCodeCompleted('1111');
    setTimeout(() => {
      expect(notificationService.successNotification).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
      done();
    }, 1500);
  });
});
