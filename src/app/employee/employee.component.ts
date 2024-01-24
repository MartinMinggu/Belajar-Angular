import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { FilterServicesService } from '../filter-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  employeeListCurrentPage: any;

  pageCountOptions: number[] = [10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100];
  employeeList: any;
  filter: string = '';

  // untuk pagination
  curentPage: number = 1;
  pageSize: number = 10;
  pageCount: number = 0;
  page: number[] = [];
  employeeCurentPageList: any;

  // untuk order berdasarkan kolom
  isAsc: boolean = true;
  kolom: string = 'username';

  constructor(
    private employeeService: EmployeeService,
    private filterService: FilterServicesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllEmployee();
    // if (this.filterService.getFilterValue()) {
    //   this.filter = this.filterService.getFilterValue();
    // }
  }

  /**
   * Mengambil semua employee
   */
  getAllEmployee() {
    this.employeeService.getAll().subscribe({
      next: (response) => {
        this.employeeList = response as any;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.getEmployeeCurrentPage();
      },
    });
  }

  getEmployeeCurrentPage() {
    this.employeeCurentPageList = this.multiFilter(
      this.employeeList,
      this.filter
    );
    this.pageCount = Math.ceil(
      this.employeeCurentPageList.length / this.pageSize
    );
    this.employeeCurentPageList = this.employeeCurentPageList.slice(
      (this.curentPage - 1) * this.pageSize,
      (this.curentPage - 1) * this.pageSize + this.pageSize
    );
    this.page = [];

    for (let index = 0; index < this.pageCount; index++) {
      this.page.push(index + 1);
    }
  }
  orderBy(column: string) {
    this.isAsc = !this.isAsc;
    if (this.isAsc) {
      this.employeeList = this.employeeList.sort((a: any, b: any) => {
        if (a[column] < b[column]) {
          return -1;
        }
        if (a[column] > b[column]) {
          return 1;
        }
        return 0;
      });
    } else {
      this.employeeList = this.employeeList.sort((a: any, b: any) => {
        if (a[column] > b[column]) {
          return -1;
        }
        if (a[column] < b[column]) {
          return 1;
        }
        return 0;
      });
    }
    this.getEmployeeCurrentPage();
  }
  multiFilter(array: any[] = [], filter: string) {
    return array.filter((item: any) => {
      return Object.values(item).some((value: any) => {
        return (
          typeof value === 'string' &&
          value.toLowerCase().includes(filter.toLowerCase())
        );
      });
    });
  }
  saveFilter() {
    this.filterService.setFilterValue(this.filter);
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
  delete(id: any, i: number) {
    this.employeeService.delete(id).subscribe({
      next: (response) => {
        console.log(response);
        this.employeeList.splice(i, 1);
        this.employeeCurentPageList.splice(i, 1);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  generatePage(
    pageIndex: number,
    pageSizeInput: HTMLSelectElement,
    filterInput: HTMLInputElement
  ) {
    console.log(pageSizeInput.value);
    this.curentPage = pageIndex;
    this.filter = filterInput.value;
    this.pageSize = Number(pageSizeInput.value);
    this.getEmployeeCurrentPage();
  }
}
