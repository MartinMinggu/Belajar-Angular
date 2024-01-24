import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  errorMesageTnC: string | undefined;
  dummyAcounts = [
    {
      email: '1@a',
      password: '111',
    },
    {
      email: '2@b',
      password: '222',
    },
  ];
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.createForm();
  }
  createForm(): FormGroup<any> {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      termAndConditions: ['', Validators.required],
    });
  }
  onSubmit() {
    // console.log(this.detailForm.getRawValue());
    const value = this.loginForm.getRawValue();
    this.errorMesageTnC = undefined;
    if (!value.termAndConditions || value.termAndConditions === '') {
      this.errorMesageTnC = 'Please Confirm Terms and condition';
      return;
    }
    if (
      !this.dummyAcounts.find(
        (account) =>
          account.email === value.email && account.password === value.password
      )
    ) {
      this.errorMesageTnC = 'Periksa kembali Username atau password anda';
      return;
    }
    localStorage.setItem('token', 'token');
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 300);
  }
}
