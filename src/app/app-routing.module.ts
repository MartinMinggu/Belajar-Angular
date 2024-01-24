import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { unAuthGuard } from './unAuth.guard';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    // component: EmployeeComponent,
    children: [
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'employee-details/:id',
        component: EmployeeDetailsComponent,
      },
      {
        path: 'add-employee',
        component: EmployeeAddComponent,
      },
      {
        path: 'update-employee/:id',
        component: EmployeeAddComponent,
      },
      {
        path: '',
        redirectTo: 'employee',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    canActivate: [unAuthGuard],
    component: LoginPageComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
