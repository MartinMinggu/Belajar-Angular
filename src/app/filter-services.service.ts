import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterServicesService {
  private filterValue: any = '';
  setFilterValue(filterValue: any) {
    this.filterValue = filterValue;
  }
  getFilterValue() {
    return this.filterValue;
  }
}
