import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public showLoginSuccess = false;
  public showLoginError = false;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {

                this.formLogin = this.formBuilder.group({
                  user: new FormControl('', Validators.required),
                  pass: new FormControl('', Validators.required)
                });

              }

  ngOnInit(): void {
  }

  checkLogin() {
     this.showLoginSuccess = false;
     this.showLoginError = false;

     this.authService.login(this.formLogin.value).subscribe(success => {

        if (success) {
           this.showLoginSuccess = true;
           localStorage.setItem('logged', 'true');
           this.router.navigate(['/list-bookings']);
           this.activeModal.close();
        } else {
           this.showLoginError = true;
        }

     });
  }

}
