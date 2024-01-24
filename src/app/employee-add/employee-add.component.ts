import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee/employee.service';
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css',
})
export class EmployeeAddComponent {
  back() {
    window.history.back();
  }
  groupOptions: string[] = ['Admin', 'Manager', 'UI/UX', 'Frontend', 'Backend'];
  employeeForm!: FormGroup;
  employee: any = [];
  isInsert: boolean = true;
  titleForm = 'Add Employee';
  dateNow = '';
  isInvalidForm = false;
  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.dateNow = this.formatDateYYYYMMDD(new Date());
    if (this.activeRoute.snapshot.paramMap.get('id')) {
      this.getEmployeeById();
    } else {
      this.employeeForm = this.createForm();
    }
  }
  formatDateYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  createForm() {
    return this.formBuilder.group({
      username: [
        this.employee?.username || '',
        Validators.compose([Validators.required]),
      ],
      firstName: [this.employee?.firstName || '', Validators.required],
      lastName: [this.employee?.lastName || '', Validators.required],
      email: [
        this.employee?.email || '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      birthDate: [this.employee?.birthDate || '', Validators.required],
      basicSalary: [
        this.employee?.basicSalary || '',
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      status: [this.employee?.status || 'true', Validators.required],
      group: [this.employee?.group || '', Validators.required],
      description: [this.employee?.description || '', Validators.required],
    });
  }
  formatDateToDDMMYYYY(date: Date): string {
    return date.toLocaleDateString('en-US');
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.isInvalidForm = true;
      return;
    }
    this.isInvalidForm = false;
    const value = this.employeeForm.getRawValue();
    console.log(value.birthDate);

    value.birthDate = this.formatDateToDDMMYYYY(new Date(value.birthDate));
    console.log(value);
    if (this.isInsert) {
      this.employeeService.add(value).subscribe({
        next: (response) => {
          console.log(response);
          alert('Success Add Employee');
          this.router.navigateByUrl('employee');
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.employeeService
        .update(this.activeRoute.snapshot.paramMap.get('id') as any, value)
        .subscribe({
          next: (response) => {
            console.log(response);
            alert('Success Update Employee');
            this.router.navigateByUrl('employee');
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }

  getEmployeeById() {
    this.employeeService
      .getById(this.activeRoute.snapshot.paramMap.get('id') as any)
      .subscribe({
        next: (response) => {
          this.employee = response;
          this.isInsert = false;
          this.employee.birthDate = this.formatDateYYYYMMDD(
            new Date(this.employee.birthDate)
          );
          this.employeeForm = this.createForm();
          this.disableInputForm();
          this.titleForm = 'Update Employee';

          console.log(this.employee.birthDate);
          console.log(this.employee);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  disableInputForm() {
    let disableInputs = ['username', 'firstName'];
    for (let i = 0; i < disableInputs.length; i++) {
      this.employeeForm.controls[disableInputs[i]].disable();
      console.log(this.employeeForm.controls[disableInputs[i]]);
    }
  }
}
