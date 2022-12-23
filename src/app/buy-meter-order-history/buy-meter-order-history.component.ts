import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SessionStorage } from 'angular-web-storage';
import { RegistrationBuyMeterService } from '../services/registration-buy-meter.service';

@Component({
  selector: 'app-buy-meter-order-history',
  templateUrl: './buy-meter-order-history.component.html',
  styleUrls: ['./buy-meter-order-history.component.css']
})
export class BuyMeterOrderHistoryComponent implements OnInit {


  displayedColumns: string[] = ['orderId','meterName','noOfItem','address','createdDate','amount','status'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild('OrderFiler', { static: false }) OrderFiler!: MatSort;
  @ViewChild('OrderHistory', { static: false }) OrderHistoryPaginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  userName: any;


  
  ngAfterViewInit() {
    this.dataSource.paginator = this.OrderHistoryPaginator;
    this.dataSource.sort = this.OrderFiler;
  }

  constructor(private route:Router,private registrationMeterService:RegistrationBuyMeterService) {
    this.dataSource = new MatTableDataSource<any>()
   }

  ngOnInit(): void {

    this.userName = JSON.parse(sessionStorage.authenticatedUser).username
    
    this.registrationMeterService.retriveUpdatePaymentStatus(this.userName).subscribe(data=>{
      this.dataSource = new MatTableDataSource(JSON.parse(data));
      this.dataSource.sort = this.OrderFiler;
      this.dataSource.paginator = this.OrderHistoryPaginator;
    })

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  back() {
    this.route.navigate(['/addtocart']);
    }
  
}
