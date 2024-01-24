import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService extends DataService {
  employeeList: any;
  constructor(http: HttpClient) {
    super('http://localhost:3000/employee', http);
  }
}
