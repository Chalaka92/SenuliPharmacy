import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../@sp/animations/fade-in-up.animation';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  model: any = {};
  inputType = 'password';
  visible = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.router.navigate(['']);
      },
      (error) => {
        this.form.reset();
      }
    );

    // this.router.navigate(['/apps/dashboard']);
    // this.snackbar.open(
    //   "Lucky you! Looks like you didn't need a password or email address! For a real application we provide validators to prevent this. ;)",
    //   'LOL THANKS',
    //   {
    //     duration: 10000,
    //   }
    // );
  }

  loggedIn() {
    const token = localStorage.getItem('currentUser');
    return !!token;
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
