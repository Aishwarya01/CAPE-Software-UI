import {
  Component, 
  EventEmitter,
  Input,
  OnInit,
  AfterViewInit,
  Output,
  ViewChild,
  OnDestroy,
  ElementRef,
  OnChanges,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from '../globals.service';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { DatePipe } from '@angular/common'
import { MatDialog } from '@angular/material/dialog';
import { ObservationService } from '../services/observation.service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatCarousel } from 'ng-mat-carousel';
import { Router } from '@angular/router';
import { LoginBuyMeterService } from '../services/login-buy-meter.service';
import { CheckoutBuyMeterComponent } from '../checkout-buy-meter/checkout-buy-meter.component';

@Component({
  selector: 'app-add-cart-buy-meter',
  templateUrl: './add-cart-buy-meter.component.html',
  styleUrls: ['./add-cart-buy-meter.component.css']
})
export class AddCartBuyMeterComponent implements OnInit {
  meterColumns: string[] = [
    'position',
    'model',
    'index',
    'price',
    'image',
    'action',
  ];
  meter_dataSource!: MatTableDataSource<any>;
  @ViewChild('meterPaginator', { static: true }) meterPaginator!: MatPaginator;
  @ViewChild('meterSort', {static: true}) meterSort!: MatSort;

  //@Output() checkoutTotal = new EventEmitter<string>();

 // @ViewChild(CheckoutBuyMeterComponent, {static: false}) checkoutTotalValue!: CheckoutBuyMeterComponent;

  meterName: String = '';
  email: String = '';
  selectedMeter: any;
  clickedMeter: any;
  value: any;
  clcikeditem: any;
//  panelOpenState = false;
  total2Ref: any;
  table1: any;
  value1: any;
  filteredData: any = [];
  clickedImage: any;
  amt:any;
  grandtotal: any;
  subtotal:number=0;
  gst:number=3.60;
  shipping:number=15.00;
  flag: boolean=false;
  filledCart: boolean=true;
  emptyCart: boolean=false;
  value2: string="";
  total:any;
  b: any =[];

  meterDropdownList: any = [,
    'MZC-304 S.C. Loop Impedance Meter-1',
    'MZC-330S Short Circuit Loop Impedance Meter',
    'MRP-201 RCD Tester',
    'MPI-530 Multi-function Meter',
    'MPI-530-IT Multi-function Meter',
    'MPI-540 PV Multi-function Meter-1',
    'EVSE-01 Adapter for testing vehicle charging stations',
    'PAT-820(PORTABLE APPLIANCE TESTER)',

    // 'MZC-306 S.C. Loop Impedance Meter',
    // 'MZC-310S S.C. Loop Impedance Meter',
    // 'MZC-320S S.C. Loop Impedance Meter',
    // 'MZC-20E S.C. Loop Impedance Meter',
    // 'MPI-502 Multi-function Meter',
    // 'MPI-506 Multi-function Meter',
    // 'MPI-507Multi-function Meter',
    // 'MPI-520 Multi-function Meter',
    // 'MPI-525 Multi-function',
    // 'MPI-535 Multi-function Meter',
    // 'MPI-540 Multi-function Meter without clamps F-3A',
    // 'MPI-540 Multi-function Meter',
    ];
  meterData1: any =[
    { quantity: 1,model: 'MZC-304 S.C. Loop Impedance Meter-1', pdf:'assets/documents/MZC304.pdf', index: 'WMGBMZC304', price: '1', image:'assets/img/mzc304.png',total: '1' },
    { quantity: 1,model: 'MZC-330S Short Circuit Loop Impedance Meter', pdf:'assets/documents/MZC.pdf', index: 'WMGBMZC330', price: '5,78,550', image:'assets/img/mzc_updated.png', total: '5,78,550' },
    { quantity: 1,model: 'MRP-201 RCD Tester', pdf:'assets/documents/MP540.pdf', index: 'WMGBMRP201', price: '98,175', image:'assets/img/mpi_updated.png', total: '98,175' },
    { quantity: 1,model: 'MPI-530 Multi-function Meter', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI530', price: '3,12,900', image:'assets/img/mpi_530I_updated.png', total: '3,12,900' },
    { quantity: 1, model: 'MPI-530-IT Multi-function Meter', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI530IT', price: '3,34,294', image:'assets/img/mpi_530I_updated.png',total: '3,34,294' },
    { quantity: 1, model: 'MPI-540 PV Multi-function Meter-1', pdf:'assets/documents/MP540.pdf', index: 'WMGBMPI540PV', price: '6,53,494', image:'assets/img/mpi540.PNG',total: '6,53,494' },
    { quantity: 1, model: 'EVSE-01 Adapter for testing vehicle charging stations', pdf:'assets/documents/EVSE-01_EN_v1.03.pdf', index: 'WMGBEVSE01', price: '1,23,375', image:'assets/img/evse_updated.png',total: '1,23,375' },
    { quantity: 1, model: 'PAT-820(PORTABLE APPLIANCE TESTER)', pdf:'assets/documents/EVSE-01_EN_v1.03.pdf', index: 'WMGBPAT820', price: '1,23,375', image:'assets/img/pat_updated.png',total: '1,23,375' },
  
    // { position: 1, model: 'MZC-20E S.C. Loop Impedance Meter', pdf:'assets/documents/MZC20E.pdf',index: 'WMGBMZC20E', price: '75863', image:'assets/img/mzc20e.png' },
    // { position: 3, model: 'MZC-306 S.C. Loop Impedance Meter', pdf:'assets/documents/MZC306.pdf', index: 'WMGBMZC306', price: '255413', image:'assets/img/mzc306.png' },
    // { position: 4, model: 'MZC-310S S.C. Loop Impedance Meter', pdf:'assets/documents/MZC.pdf', index: 'WMGBMZC310', price: '315919', image:'assets/img/mzc_new.png' },
    // { position: 5, model: 'MZC-320S S.C. Loop Impedance Meter', pdf:'assets/documents/MZC320S.pdf', index: 'WMGBMZC320', price: '381413', image:'assets/img/mzc_new.png' },
    // { position: 8, model: 'MPI-502 Multi-function Meter', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI502', price: '111300', image:'assets/img/mpi_new.png' },
    // { position: 9, model: 'MPI-506 Multi-function Meter', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI506', price: '124425', image:'assets/img/mpi_new.png' },
    // { position: 10, model: 'MPI-507Multi-function Meter', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI507', price: '168525', image:'assets/img/mpi_new.png' },
    // { position: 11, model: 'MPI-520 Multi-function Meter', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI520', price: '255281', image:'assets/img/mpi_new.png' },
    // { position: 12, model: 'MPI-525 Multi-function', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI525', price: '284813', image:'assets/img/mpi_new.png' },
    // { position: 15, model: 'MPI-535 Multi-function Meter', pdf:'assets/documents/MPI535.pdf', index: 'WMGBMPI535', price: '366056', image:'assets/img/mp535.PNG' },
    // { position: 16, model: 'MPI-540 Multi-function Meter without clamps F-3A', pdf:'assets/documents/MP540.pdf', index: 'WMGBMPI540NC', price: '373538', image:'assets/img/mpi540.PNG' },
    // { position: 17, model: 'MPI-540 Multi-function Meter', pdf:'assets/documents/MP540.pdf', index: 'WMGBMPI540', price: '583669', image:'assets/img/mpi540.PNG' },
  ];
 
  meterData2: any =[
  { quantity: 1, model: 'MPI-530-IT Multi-function Meter', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI530IT', price: '3,34,294', image:'assets/img/mpi_530I_updated.png',total: '3,34,294' },
  { quantity: 1, model: 'MPI-540 PV Multi-function Meter-1', pdf:'assets/documents/MP540.pdf', index: 'WMGBMPI540PV', price: '6,53,494', image:'assets/img/mpi540.PNG',total: '6,53,494' },
  { quantity: 1, model: 'EVSE-01 Adapter for testing vehicle charging stations', pdf:'assets/documents/EVSE-01_EN_v1.03.pdf', index: 'WMGBEVSE01', price: '1,23,375', image:'assets/img/evse_updated.png',total: '1,23,375' },
  { quantity: 1, model: 'PAT-820(PORTABLE APPLIANCE TESTER)', pdf:'assets/documents/EVSE-01_EN_v1.03.pdf', index: 'WMGBPAT820', price: '1,23,375', image:'assets/img/pat_updated.png',total: '1,23,375' },

  // { position: 1, model: 'MZC-20E S.C. Loop Impedance Meter', pdf:'assets/documents/MZC20E.pdf',index: 'WMGBMZC20E', price: '75863', image:'assets/img/mzc20e.png' },
  // { position: 3, model: 'MZC-306 S.C. Loop Impedance Meter', pdf:'assets/documents/MZC306.pdf', index: 'WMGBMZC306', price: '255413', image:'assets/img/mzc306.png' },
  // { position: 4, model: 'MZC-310S S.C. Loop Impedance Meter', pdf:'assets/documents/MZC.pdf', index: 'WMGBMZC310', price: '315919', image:'assets/img/mzc_new.png' },
  // { position: 5, model: 'MZC-320S S.C. Loop Impedance Meter', pdf:'assets/documents/MZC320S.pdf', index: 'WMGBMZC320', price: '381413', image:'assets/img/mzc_new.png' },
  // { position: 8, model: 'MPI-502 Multi-function Meter', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI502', price: '111300', image:'assets/img/mpi_new.png' },
  // { position: 9, model: 'MPI-506 Multi-function Meter', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI506', price: '124425', image:'assets/img/mpi_new.png' },
  // { position: 10, model: 'MPI-507Multi-function Meter', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI507', price: '168525', image:'assets/img/mpi_new.png' },
  // { position: 11, model: 'MPI-520 Multi-function Meter', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI520', price: '255281', image:'assets/img/mpi_new.png' },
  // { position: 12, model: 'MPI-525 Multi-function', pdf:'assets/documents/MPI.pdf', index: 'WMGBMPI525', price: '284813', image:'assets/img/mpi_new.png' },
  // { position: 15, model: 'MPI-535 Multi-function Meter', pdf:'assets/documents/MPI535.pdf', index: 'WMGBMPI535', price: '366056', image:'assets/img/mp535.PNG' },
  // { position: 16, model: 'MPI-540 Multi-function Meter without clamps F-3A', pdf:'assets/documents/MP540.pdf', index: 'WMGBMPI540NC', price: '373538', image:'assets/img/mpi540.PNG' },
  // { position: 17, model: 'MPI-540 Multi-function Meter', pdf:'assets/documents/MP540.pdf', index: 'WMGBMPI540', price: '583669', image:'assets/img/mpi540.PNG' },
  ];
  modalReference: any;

  meterData3: any =[];
  cartCount: any;
  
 
  constructor(private changeDetectorRef: ChangeDetectorRef,
    public service: GlobalsService,
    private modalService: NgbModal,
    private router1: ActivatedRoute,
   public datepipe: DatePipe,private router: Router,private loginBuyMeterService : LoginBuyMeterService
  ) {
    this.email = this.router1.snapshot.paramMap.get('email') || '{}';
  }

  // ngOnDestroy(): void {
  //   this.service.cartIndex="";
  //  }
 
  ngOnInit(): void {
    //this.b="WMGBMZC304";
    this.service.cartIndex;
    for(let j=0; j<this.meterData1.length; j++){
      for(let i=0; i<this.service.cartIndex.length; i++ ){
        if(this.meterData1[j].index==this.service.cartIndex[i]){
          this.meterData3.push(this.meterData1[j]);
      }
    }
  }
//   for(let j=0; j<this.meterData2.length; j++){
//     for(let i=0; i<this.service.cartIndex.length; i++ ){
//       if(this.meterData2[j].index==this.service.cartIndex[i]){
//         this.meterData3.push(this.meterData2[j]);
//     }
//   }
// }
//this.service.sharedMessage.subscribe(grandtotal => this.grandtotal = grandtotal);
    this.setPagination();
  } 

  setPagination() {
    this.findsum();  
    this.grandTotalSum();
    // this.filteredData=this.meterData3;
    // this.meter_dataSource = new MatTableDataSource(this.filteredData);
    // this.meter_dataSource.paginator = this.meterPaginator;
    // this.meter_dataSource.sort = this.meterSort;
  }
  compareProd(contentCompare:any,a:any) {
   this.modalService.open(contentCompare, {
       centered: true, 
       size: 'lg',
      });
     this.clickedMeter = a.model;
     this.clcikeditem=a.index;
     this.value = this.clcikeditem;
    } 

    findsum(){
      this.subtotal=0;
      for(let j=0; j<this.meterData3.length; j++){
      //let temp_price=(+this.meterData3[j].price.replaceAll(',', '') * +this.meterData3[j].quantity);
      this.subtotal+= +this.meterData3[j].total.replaceAll(',', '');
      console.log(this.subtotal);
      }
      }

      grandTotalSum(){
        this.grandtotal= this.subtotal + this.gst + this.shipping;
        console.log(this.grandtotal);
      }
     
      removeItem(index: any) {
        if(this.meterData3.length>1){
          this.meterData3.splice(index, 1);
          this.findsum();
          this.grandTotalSum();
          this.meterData3.pop()
        }
        else{
          this.service.cartIndex.length=0;
          this.meterData3 =[];  
          this.filledCart= false;
          this.emptyCart=true;  
        }
      }
      removeAllItem(){
        this.service.cartIndex.length=0;
        this.meterData3 =[];  
        this.filledCart= false;
        this.emptyCart=true;
      }
      backBUtton(){
       // this.meterData3 =[];  
        this.router.navigate(['/buyMeter']);
      }
      
    zoomImage(contentImage:any,a:any){
      this.modalService.open(contentImage, {
        centered: true, 
        size: 'lg',
       });
       this.clickedImage = a.image;
    }
    changeMeter(e: any) {
      let changedValue = '';
      if (e.target != undefined) {
        changedValue = e.target.value
      }
      else {
        changedValue = e;
      }
      this.selectedMeter = e.target.value;
      this.value1 = this.selectedMeter;

     // this.table1=this.total2Ref;
    }

    disable(meter: any): boolean {
      return meter === this.clickedMeter;
    }

    quantityChange(event:any, a:any,i:any) {  //i=3
      console.log(i);
      let temp_price=this.meterData3[i].price.replaceAll(',', '');
      this.amt=temp_price;
      //this.total=this.amt * a.quantity;
      this.meterData3[i].total =this.amt * a.quantity;
     //this.total=this.total.replace(",", "").replace(/(\d+)(\d{3})/, "$1,$2");
     this.meterData3[i].total=this.meterData3[i].total.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      console.log(event, a);
      this.findsum();
    }

    addtoCartIndex(){
      console.log();
    }


    meterLogout(){
        this.loginBuyMeterService.Signout();
        this.router.navigate(['/signIn-buyMeter']);
    }
  
    profile(){
      this.router.navigate(['/profile-buyMeter']);
    }
    checkoutConfirm(checkOutConfirm: any){
      this.modalReference = this.modalService.open(checkOutConfirm, {centered:true, size: 'sm' })
    }

    onCancel() {
      this.modalReference.close();
    }
    checkoutNavigation(){
      this.service.checkGrandtotal=this.grandtotal;
         this.router.navigate(['checkout-buyMeter']);
         this.modalReference.close();
        // this.valueChange.emit(this.grandtotal());
      //  this.service.setData(this.grandtotal);
    }
}
