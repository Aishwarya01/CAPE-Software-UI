import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Supplycharacteristics } from '../model/supplycharacteristics';
import { SupplyCharacteristicsService } from '../services/supply-characteristics.service';


@Component({
  selector: 'app-inspection-verification-supply-characteristics',
  templateUrl: './inspection-verification-supply-characteristics.component.html',
  styleUrls: ['./inspection-verification-supply-characteristics.component.css']
})
export class InspectionVerificationSupplyCharacteristicsComponent implements OnInit {

  supplycharesteristic = new Supplycharacteristics;
  enableAC: boolean = false;
  enableDC: boolean = false;
  tableAC: boolean = false;
  enable2AC: boolean = false;
  enable2DC: boolean = false;
  table2AC: boolean = false;
  location1Arr!: FormArray;
  location2Arr!: FormArray;
  location3Arr!: FormArray;
  alternateArr!: FormArray;
  i:any;
  delarr:any;
  values:any;
  value:any;
  loclength: any;



  panelOpenState = false;
  systemEarthingList: String[]= ['TN-C','TN-C-S','TN-S','IT','TT','To be verified'];
  liveConductorACList:String[]=['1-phase, 2-wire (LN)','1-phase, 3-wire (LLM)','2-phase, 3-wire (LLN)','3-phase, 3-wire (LLL)','3-phase, 4-wire (LLLN)'];
  liveConductorDCList:String[]=['2-pole','3-pole','Others'];
  ProtectiveDevicelist:string[]=['Fuse','MCB','MCCB','ACB'];
  AlternatesupplyList:string[]=['Yes','No'];
  MeansofEarthingList:string[]=['Suppliers facility',' Installation earth electrode'];
  electrodeTypeList:string[]=['Vertical','Horizontal','Combined vertical + horizontal'];
  electrodeMaterialList:string[]=['Copper','Coppebondedr  steel','Galvanised steel','Combination','Others'];
  conductorVerifyList:string[]=['Yes','No'];
  bondingConductorVerifyList:string[]=['Yes','No'];
  earthingConductorVerifyList:string[]=['Yes','No'];

  supplycharesteristicForm = new FormGroup({
    // systemEarthing: new FormControl(''),
    // liveConductor: new FormControl(''),
    // AcConductor: new FormControl(''),
    // DcConductor: new FormControl(''),
    // briefNote: new FormControl(''),

  })
  sources: boolean=false;
  breaker: boolean=false;
  enableRCBO: boolean;

  constructor(private supplyCharacteristicsService: SupplyCharacteristicsService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.supplycharesteristicForm = this.formBuilder.group({
      location1Arr: this.formBuilder.array([this.createLocation1Form()]),
      location2Arr: this.formBuilder.array([this.createLocation2Form()]),
      location3Arr: this.formBuilder.array([this.createLocation3Form()]),
      alternateArr: this.formBuilder.array([this.createLocation4Form()])
    });
    }


    private createLocation1Form(): FormGroup {
      return new FormGroup({
        locationNumber: new FormControl(''),
        locationName: new FormControl(''),
        electrodeResistanceToEarth: new FormControl(''),
        electrodeResistanceToGrid: new FormControl(''),
      })
    }

    private createLocation2Form(): FormGroup {
      return new FormGroup({
        location: new FormControl(''),
        jointNo: new FormControl(''),
        jointResistance: new FormControl('')
      })
    }

    private createLocation3Form(): FormGroup {
      return new FormGroup({
        location: new FormControl(''),
        jointNo: new FormControl(''),
        jointResistance: new FormControl('')
      })
    }

    private createLocation4Form(): FormGroup {
      return new FormGroup({
        supply:new FormControl(''),
        short:new FormControl(''),
        earthing:new FormControl(''),
        live:new FormControl(''),
        AC:new FormControl(''),
        DC:new FormControl(''),
       // brief:new FormControl(''),
       // Incoming:new FormControl('')
      })
    }

    

    //value = ''; addLocation2
    onKey1(event: KeyboardEvent)    {
      this.values = (<HTMLInputElement>event.target).value ;
     this.value = this.values;
      this.location1Arr = this.supplycharesteristicForm.get('location1Arr') as FormArray;
        if(this.location1Arr.length==0)
      {
        if(this.value != "")
            {
       //this.value = value;
  
        for (this.i=1; this.i<this.value; this.i++ )
        {
          this.location1Arr = this.supplycharesteristicForm.get('location1Arr') as FormArray;
          this.location1Arr.push(this.createLocation1Form());
        }
      }
      }
      else if (this.value=="")
      {
       this.loclength=this.location1Arr.length;
        for (this.i=1; this.i<this.loclength; this.i++ )
           {
             //this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
             this.location1Arr.removeAt(this.location1Arr.length-1);
           }
          // this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
          // this.location2Arr.push(this.createLocation2Form());
        
     }
         else if (this.location1Arr.length < this.value)
         {
          if(this.value != "")
          {
         this.delarr =  this.value-this.location1Arr.length;
         for (this.i=0; this.i<this.delarr; this.i++ )
         {
           this.location1Arr = this.supplycharesteristicForm.get('location1Arr') as FormArray;
           this.location1Arr.push(this.createLocation1Form());
         }
        }
        }
         else (this.location1Arr.length > this.value )
         {
         if(this.value != "")
            {
         this.delarr =  this.location1Arr.length-this.value;
         for (this.i=0; this.i<this.delarr; this.i++ )
         {
           this.location1Arr = this.supplycharesteristicForm.get('location1Arr') as FormArray;
           this.location1Arr.removeAt(this.location1Arr.length-1);
      }
    }
  }
     }

    // addLocation1() {
    //   this.location1Arr = this.supplycharesteristicForm.get('location1Arr') as FormArray;
    //   this.location1Arr.push(this.createLocation1Form());
    // }

    

    //value = ''; addLocation2
    onKey(event: KeyboardEvent)    {
      this.values = (<HTMLInputElement>event.target).value ;
     this.value = this.values;
      this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
        if(this.location2Arr.length==0)
      {
        if(this.value != "")
            {
       //this.value = value;
  
        for (this.i=1; this.i<this.value; this.i++ )
        {
          this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
          this.location2Arr.push(this.createLocation2Form());
        }
      }
      }
      else if (this.value=="")
      {
       this.loclength=this.location2Arr.length;
        for (this.i=1; this.i<this.loclength; this.i++ )
           {
             //this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
             this.location2Arr.removeAt(this.location2Arr.length-1);
           }
          // this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
          // this.location2Arr.push(this.createLocation2Form());
        
     }
         else if (this.location2Arr.length < this.value)
         {
          if(this.value != "")
          {
         this.delarr =  this.value-this.location2Arr.length;
         for (this.i=0; this.i<this.delarr; this.i++ )
         {
           this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
           this.location2Arr.push(this.createLocation2Form());
         }
        }
        }
         else (this.location2Arr.length > this.value )
         {
         if(this.value != "")
            {
         this.delarr =  this.location2Arr.length-this.value;
         for (this.i=0; this.i<this.delarr; this.i++ )
         {
           this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
           this.location2Arr.removeAt(this.location2Arr.length-1);
      }
    }
  }
    }
  
    // addLocation2() {
    //   this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
    //   this.location2Arr.push(this.createLocation2Form());
    // }


    //value = ''; addLocation3
    onKey3(event: KeyboardEvent)    {
      this.values = (<HTMLInputElement>event.target).value ;
     this.value = this.values;
      this.location3Arr = this.supplycharesteristicForm.get('location3Arr') as FormArray;
        if(this.location3Arr.length==0)
      {
        if(this.value != "")
            {
       //this.value = value;
  
        for (this.i=1; this.i<this.value; this.i++ )
        {
          this.location3Arr = this.supplycharesteristicForm.get('location3Arr') as FormArray;
          this.location3Arr.push(this.createLocation3Form());
        }
      }
      }
      else if (this.value=="")
      {
       this.loclength=this.location3Arr.length;
        for (this.i=1; this.i<this.loclength; this.i++ )
           {
             //this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
             this.location3Arr.removeAt(this.location3Arr.length-1);
           }
          // this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
          // this.location2Arr.push(this.createLocation2Form());
        
     }
         else if (this.location3Arr.length < this.value)
         {
          if(this.value != "")
          {
         this.delarr =  this.value-this.location3Arr.length;
         for (this.i=0; this.i<this.delarr; this.i++ )
         {
          this.location3Arr = this.supplycharesteristicForm.get('location3Arr') as FormArray;
          this.location3Arr.push(this.createLocation3Form());
         }
        }
        }
         else (this.location3Arr.length > this.value )
         {
         if(this.value != "")
            {
         this.delarr =  this.location3Arr.length-this.value;
         for (this.i=0; this.i<this.delarr; this.i++ )
         {
           this.location3Arr = this.supplycharesteristicForm.get('location3Arr') as FormArray;
           this.location3Arr.removeAt(this.location3Arr.length-1);
      }
    }
  }
    }
    // addLocation3() {
    //   this.location3Arr = this.supplycharesteristicForm.get('location3Arr') as FormArray;
    //   this.location3Arr.push(this.createLocation3Form());
    // }

  getLocation1Controls(): AbstractControl[] {
    return (<FormArray> this.supplycharesteristicForm.get('location1Arr')).controls
  }

  getLocation2Controls(): AbstractControl[] {
    return (<FormArray> this.supplycharesteristicForm.get('location2Arr')).controls
  }

  getLocation3Controls(): AbstractControl[] {
    return (<FormArray> this.supplycharesteristicForm.get('location3Arr')).controls
  }
  getLocation4Controls(): AbstractControl[] {
    return (<FormArray> this.supplycharesteristicForm.get('alternateArr')).controls
  }
  changeCurrent(e: any) {
    let changedValue = e.target.value;
    debugger
    if(changedValue == "AC") {
      this.enableAC = true;
      this.enableDC = false;
      this.tableAC = true;
    }
    else {
      this.enableDC = true;
      this.enableAC = false;
      this.tableAC = false;

    }
  }

  changeCurrent2(e: any) {
    let changedValue = e.target.value;
    if(changedValue == "AC") {
      this.enable2AC = true;
      this.enable2DC = false;
      this.table2AC = true;
    }
    else {
      this.enable2DC = true;
      this.enable2AC = false;
      this.table2AC = false;

    }
  }
  changeCurrent3(e: any) {
    let changedValue = e.target.value;
   if(changedValue == "RCBO") {
      this.enableRCBO = true;
    }
    else {
    
      this.enableRCBO = false;
  }
  }

  onKeyAlernate(event: KeyboardEvent)    {
    this.values = (<HTMLInputElement>event.target).value ;
   this.value = this.values;
   // this.alternateArr = this.supplycharesteristicForm.get('alternateArr') as FormArray;
     
      if(this.value != "")
      {
        this.alternateArr = this.supplycharesteristicForm.get('alternateArr') as FormArray;
        if(this.alternateArr.length==1){
     //this.value = value;
      for (this.i=1; this.i<this.value; this.i++ )
      {
        this.alternateArr.push(this.createLocation4Form());
      }
      this.sources= true;
      this.breaker=true;
    }
    else{
      for (this.i=0; this.i<this.value; this.i++ )
      {
        this.alternateArr.push(this.createLocation4Form());
      }
      this.sources= true;
      this.breaker=true;
    }
    }
    
    else if (this.value=="")
    {
     this.loclength=this.alternateArr.length;
      for (this.i=0; this.i<this.loclength; this.i++ )
         {
           //this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
           this.alternateArr.removeAt(this.alternateArr.length-1);
         }
        // this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
        // this.location2Arr.push(this.createLocation2Form());
        //this.sources= false;
        this.breaker=false;
   }
   //this.breaker=false;

      //  else if (this.alternateArr.length < this.value)
      //  {
      //   if(this.value != "")
      //   {
      //  this.delarr =  this.value-this.alternateArr.length;
      //  for (this.i=0; this.i<this.delarr; this.i++ )
      //  {
      //   this.alternateArr = this.supplycharesteristicForm.get('alternateArr') as FormArray;
      //   this.alternateArr.push(this.createLocation4Form());
      //  }
      //    }
      // }
      //  else if (this.alternateArr.length > this.value)
      //  {
      //  if(this.value != "")
      //     {
      //  this.delarr =  this.alternateArr.length-this.value;
      //  for (this.i=0; this.i<this.delarr; this.i++ )
      //  {
      //    this.alternateArr = this.supplycharesteristicForm.get('alternateArr') as FormArray;
      //    this.alternateArr.removeAt(this.alternateArr.length-1);
      //   }
      //      }
      //   }
  }
  // onKeyAlernate(event: KeyboardEvent)    
  // {
  //   this.values = (<HTMLInputElement>event.target).value ;
  //   this.value = this.values;
  //     if(this.value != "")
  //         {
  //           this.alternateArr = this.supplycharesteristicForm.get('alternateArr') as FormArray;
  //           this.sources= true;
  //           for (this.i=1; this.i<this.value; this.i++ )
  //           {
  //             this.alternateArr.push(this.createLocation4Form());
  //           }     
  //      }
  //   else
  //   {
  //     //this.sources= false;
  //     this.loclength=this.alternateArr.length;
  //     for (this.i=0; this.i<this.loclength; this.i++ )
  //        {
  //          this.alternateArr.removeAt(this.alternateArr.length-1);
  //        }
  //  }
  // }




















}
