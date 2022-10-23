import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User, UserResourceService} from "@influencer/api-client";
import {MustMatch} from "@influencer/helpers";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'influencer-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  authForm!: FormGroup;
  userRoles =  User.RoleEnum;
  isLoading!: boolean;

  constructor(
      private formBuilder: FormBuilder,
      private userResourceService: UserResourceService,
      private message: NzMessageService,
      private router: Router,
      private modal: NzModalService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$')]],
      name: ['', Validators.required],
      role: ['SALE', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    }, {
        validators: MustMatch('password', 'confirm_password'),
      });
  }

  submitForm() {
    this.isLoading = true;
    this.userResourceService.createUser(this.authForm.value).subscribe(
      (authenticate) => {
        this.isLoading = false;
        if (authenticate) {
          this.message.create('success', `Register success!`);
          this.router.navigate(['/auth/login']);
        }
      },
      (error) => {
        this.isLoading = false;
        this.modal.error({
          nzTitle: 'Register failed!',
          nzContent: 'Params is incorrect...'
        });
      }
    );
  }
}
