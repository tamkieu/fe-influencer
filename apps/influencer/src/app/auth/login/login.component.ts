import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {UserResourceService} from "@influencer/api-client";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthenticateService} from "@influencer/authenticate";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'influencer-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm!: FormGroup;
  isLoading!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userResourceService: UserResourceService,
    private message: NzMessageService,
    private authenticateService: AuthenticateService,
    private router: Router,
    private modal: NzModalService
  ) {
    this.createForm();
  }

  submitForm(): void {
    this.isLoading = true;
    this.userResourceService.login({
        email: this.authForm.controls['username'].value,
        password: this.authForm.controls['password'].value,
        remember: this.authForm.controls['rememberMe'].value
      }).subscribe(
        (authenticate) => {
          this.isLoading = false;
          if (authenticate && authenticate.id) {
            this.message.create('success', `Login success!`);
            this.authenticateService
              .storeAuthenticationToken({
                ...authenticate,
                remember: this.authForm.controls['rememberMe'].value
              })
              .subscribe((_) => {
                this.router.navigate(['']);
              });
          }
        },
        (error) => {
          this.isLoading = false;
          this.modal.error({
            nzTitle: 'Login failed!',
            nzContent: 'Your Email or Password is incorrect...'
          });
        }
      );
  }



  ngOnInit(): void {

  }

  private createForm() {
    this.authForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$')],
      ],
      password: ['', Validators.required],
      rememberMe: true,
    });
  }

}
