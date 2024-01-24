import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent implements OnInit {
  goBack() {
    window.history.back();
  }
  employee: any = null;
  constructor(
    private activeRoute: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}
  ngOnInit(): void {
    this.getUserById();
  }
  getUserById() {
    const id: any = this.activeRoute.snapshot.paramMap.get('id');
    this.employeeService.getById(id).subscribe({
      next: (response) => {
        this.employee = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
