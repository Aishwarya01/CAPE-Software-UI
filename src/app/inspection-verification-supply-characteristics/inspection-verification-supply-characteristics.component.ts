import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Supplycharacteristics, Supplyparameters } from '../model/supplycharacteristics';
import { SupplyCharacteristicsService } from '../services/supply-characteristics.service';

@Component({
  selector: 'app-inspection-verification-supply-characteristics',
  templateUrl: './inspection-verification-supply-characteristics.component.html',
  styleUrls: ['./inspection-verification-supply-characteristics.component.css']
})
export class InspectionVerificationSupplyCharacteristicsComponent implements OnInit {
  a:any;
  supplyparameters= new Supplyparameters;
  supplycharesteristic = new Supplycharacteristics;
  enableAC: boolean = false;
  enableDC: boolean = false;
  tableAC: boolean = false;
  enable2AC: boolean = false;
  enable2DC: boolean = false;
  table2AC: boolean = false;
  showAlternate: boolean = false;
  location1Arr!: FormArray;
  location2Arr!: FormArray;
  location3Arr!: FormArray;
  alternateArr!: FormArray;
  circuitArr!: FormArray;
  i:any;
  delarr:any;
  values:any;
  value:any;
  loclength: any;
  loc1length: any;

  NV1: any;
  NV2: any;
  NV3: any;
  NV4: any;
  NV5: any;
  NV6: any;
  NV7: any;
  NV8: any;
  NV9: any;

  NF1: any;
  NF2: any;
  NF3: any;
  NF4: any;
  NF5: any;
  NF6: any;
  NF7: any;
  NF8: any;
  NF9: any;


  PF1: any;
  PF2: any;
  PF3: any;
  PF4: any;
  PF5: any;
  PF6: any;
  PF7: any;
  PF8: any;
  PF9: any;


  EL1: any;
  EL2: any;
  EL3: any;
  EL4: any;
  EL5: any;
  EL6: any;
  EL7: any;
  EL8: any;
  EL9: any;

  nominalVoltageArr: any = [];
  nominalVoltageArr1: any = [];

  nominalVoltage: any;
  nominalVoltage1: any;
  nominalVoltage2: any;


  nominalFrequencyArr: any = [];
  nominalFrequency: String ="";

  nominalCurrentArr: any = [];
  nominalCurrent: String ="";
  
  loopImpedenceArr: any = [];
  loopImpedence: String ="";

  panelOpenState = false;
  systemEarthingList: String[]= ['TN-C','TN-C-S','TN-S','IT','TT'];
  liveConductorACList:String[]=['1-phase, 2-wire (LN)','1-phase, 3-wire (LLM)','2-phase, 3-wire (LLN)','3-phase, 3-wire (LLL)','3-phase, 4-wire (LLLN)'];
  liveConductorDCList:String[]=['2-pole','3-pole','Others'];
  ProtectiveDevicelist:string[]=['Fuse','MCB','MCCB','ACB'];
  AlternatesupplyList:string[]=['yes','No'];
  MeansofEarthingList:string[]=['Suppliers facility',' Installation earth electrode'];
  electrodeTypeList:string[]=['Vertical','Horizontal','Combined vertical + horizontal'];
  electrodeMaterialList:string[]=['Copper','Coppebondedr  steel','Galvanised steel','Combination','Others'];
  conductorVerifyList:string[]=['yes','No'];
  bondingConductorVerifyList:string[]=['yes','No'];
  earthingConductorVerifyList:string[]=['yes','No'];

  supplycharesteristicForm = new FormGroup({
    live: new FormControl('')

  })

  myValue: any;
  sources: boolean=false;
  breaker: boolean=false;

  
  constructor(private supplyCharacteristicsService: SupplyCharacteristicsService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.supplycharesteristicForm = this.formBuilder.group({
      live : [null, Validators.compose([Validators.required])],
      systemEarthing: ['', Validators.required],
      liveConductor: ['', Validators.required],
      AcConductor: ['', Validators.required],
      DcConductor: ['', Validators.required],
      briefNote: ['', Validators.required],
      liveConductorBNote: ['',Validators.required],

      alternativeSupply: ['',Validators.required],
      supplyNumber: ['',Validators.required],
      maximumDemand: ['', Validators.required],
      maximumLoad: ['', Validators.required],
      meansEarthing: ['', Validators.required],
      electrodeType: ['', Validators.required],
      electrodeMaterial: ['', Validators.required],
      noOfLocation: ['',Validators.required],
      conductorSize: ['',Validators.required],
      conductormaterial: ['', Validators.required],
      conductorVerify: ['', Validators.required],
      bondingConductorSize: ['', Validators.required],
      bondingConductorMaterial: ['', Validators.required],
      bondingConductorVerify: ['', Validators.required],
      bondingJointsType: ['',Validators.required],
      bondingNoOfJoints: ['', Validators.required],
      earthingConductorSize: ['', Validators.required],
      earthingConductorMaterial: ['', Validators.required],
      earthingConductorVerify: ['', Validators.required],
      earthingJointsType: ['', Validators.required],
      earthingNoOfJoints: ['', Validators.required],
      NV1: (''),
      NV2: (''),
      NV3: (''),
      NV4: (''),
      NV5: (''),
      NV6: (''),
      NV7: (''),
      NV8: (''),
      NV9: (''),
      
      NF1: (''),
      NF2: (''),
      NF3: (''),
      NF4: (''),
      NF5: (''),
      NF6: (''),
      NF7: (''),
      NF8: (''),
      NF9: (''),

      PF1: (''),
      PF2: (''),
      PF3: (''),
      PF4: (''),
      PF5: (''),
      PF6: (''),
      PF7: (''),
      PF8: (''),
      PF9: (''),

      EL1: (''),
      EL2: (''),
      EL3: (''),
      EL4: (''),
      EL5: (''),
      EL6: (''),
      EL7: (''),
      EL8: (''),
      EL9: (''),


      location1Arr: this.formBuilder.array([this.createLocation1Form()]),
      location2Arr: this.formBuilder.array([this.createLocation2Form()]),
      location3Arr: this.formBuilder.array([this.createLocation3Form()]),
      alternateArr: this.formBuilder.array([this.SupplyparametersForm()]),
      circuitArr: this.formBuilder.array([this.createCircuitForm()]),
     // SupplyparametersArr: this.formBuilder.array([this.

    });
    }
   
        

    private createLocation1Form(): FormGroup {
      return new FormGroup({
        locationNo: new FormControl(''),
        locationName: new FormControl(''),
        electrodeResistanceEarth: new FormControl(''),
        electrodeResistanceGird: new FormControl(''),
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

    private SupplyparametersForm(): FormGroup {
      return new FormGroup({
        supply:new FormControl(''),
        short:new FormControl(''),
        earthing:new FormControl(''),
        live:new FormControl(''),
        AC:new FormControl(''),
        DC:new FormControl(''),
        nominalVoltage: new FormControl(''),
        nominalFrequency: new FormControl(''),
        faultCurrent: new FormControl(''),
        loopImpedance: new FormControl(''),
        installedCapacity: new FormControl(''),
        actualLoad: new FormControl(''),       
        nominalVoltageArr1: this.formBuilder.array([
          this.nominalVoltageForm()
        ])
      })
    }

    nominalVoltageForm() : FormGroup {
      return new FormGroup({
        nominalVoltage:new FormControl(''),
        nominalVoltage1:new FormControl(''),
        nominalVoltage2:new FormControl('')

      })
    }

    private createCircuitForm(): FormGroup {
      return new FormGroup({
        location:new FormControl(''),
        type:new FormControl(''),
        noPoles:new FormControl(''),
        current:new FormControl(''),
        voltage:new FormControl(''),
        fuse:new FormControl(''),
        residualCurrent:new FormControl(''),
        residualTime:new FormControl('')
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

  getCircuitControls(): AbstractControl[] {
    return (<FormArray> this.supplycharesteristicForm.get('circuitArr')).controls
  }
  getnominalVoltageArr1Controls(): AbstractControl[] {
    return (<FormArray> this.supplycharesteristicForm.get('nominalVoltageArr1')).controls
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
  showAlternateField(event:any) {
    console.log('changed', event && event.value);
  }

  // showAlternateField(e: any) {
  //   let changedValue = e.target.value;
  //   if(changedValue == "YES") {
  //     this.showAlternate = true;
  //   }
  // }

  onKeyAlernate(event: KeyboardEvent)    {
    this.values = (<HTMLInputElement>event.target).value ;
   this.value = this.values;
   // this.alternateArr = this.supplycharesteristicForm.get('alternateArr') as FormArray;
     
      if(this.value != "")
      {
        this.alternateArr = this.supplycharesteristicForm.get('alternateArr') as FormArray;
        this.circuitArr = this.supplycharesteristicForm.get('circuitArr') as FormArray;
        if(this.alternateArr.length==1){
     //this.value = value;
      for (this.i=1; this.i<this.value; this.i++ )
      {
        this.alternateArr.push(this.SupplyparametersForm());
        this.circuitArr.push(this.createCircuitForm());
      }
      this.sources= true;
      this.breaker=true;
    }
    else{
      for (this.i=0; this.i<this.value; this.i++ )
      {
        this.alternateArr.push(this.SupplyparametersForm());
        this.circuitArr.push(this.createCircuitForm());
      }
      this.sources= true;
      this.breaker=true;
    }
    }
    
    else if (this.value=="")
    {
     this.loclength=this.alternateArr.length;
     this.loc1length=this.circuitArr.length;

      for (this.i=0; this.i<this.loclength; this.i++ )
         {
           //this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
           this.alternateArr.removeAt(this.alternateArr.length-1);
         }
      for (this.i=0; this.i<this.loc1length; this.i++ )
        {
          //this.location2Arr = this.supplycharesteristicForm.get('location2Arr') as FormArray;
          this.circuitArr.removeAt(this.circuitArr.length-1);
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
      //   this.alternateArr.push(this.SupplyparametersForm());
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
  //             this.alternateArr.push(this.SupplyparametersForm());
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
  
nextTab2() {
  debugger
    this.nominalVoltageArr.push(this.NV1,this.NV2,this.NV3,this.NV4,this.NV5,this.NV6,this.NV7,this.NV8,this.NV9);
    this.nominalFrequencyArr.push(this.NF1,this.NF2,this.NF3,this.NF4,this.NF5,this.NF6,this.NF7,this.NF8,this.NF9);
    this.nominalCurrentArr.push(this.PF1,this.PF2,this.PF3,this.PF4,this.PF5,this.PF6,this.PF7,this.PF8,this.PF9);
    this.loopImpedenceArr.push(this.EL1,this.EL2,this.EL3,this.EL4,this.EL5,this.EL6,this.EL7,this.EL8,this.EL9);

    // alternate
    this.alternateArr = this.supplycharesteristicForm.get('alternateArr') as FormArray;
    this.supplycharesteristic.Supplyparameters = this.supplycharesteristicForm.value.alternateArr

    this.alternateArr.push(this.nominalVoltageArr1);

    for(let i of this.nominalVoltageArr) {
      if(i != undefined) {
        this.nominalVoltage += i+",";
      }
    }

    for( let i of this.supplycharesteristic.Supplyparameters) {
        if(this.i != undefined) {
         this.nominalVoltage += i+",";
        }
      }





    // for(let b of this.supplycharesteristic.Supplyparameters) {
    //   if(b != undefined) {

    //     this.supplycharesteristicForm.value.alternateArr.nominalVoltage += b+",";
    //   }
    // }
        // alternate
    // for(this.i=0; this.i<this.alternateArr.length; this.i++) {
    //   if(this.i != undefined) {
    //     this. +=  this.i+",";
    //   }
    // }
    for(let j of this.nominalFrequencyArr) {
      if(j != undefined) {
        this.nominalFrequency += j+",";
      }
    }

    for(let k of this.nominalCurrentArr) {
      if(k != undefined) {
        this.nominalCurrent += k+",";
      }
    }

    for(let l of this.loopImpedenceArr) {
      if(l != undefined) {
        this.loopImpedence += l+",";
      }
    }
    this.supplycharesteristic.mainNominalVoltage = this.nominalVoltage
    this.supplycharesteristic.mainNominalFrequency = this.nominalFrequency
    this.supplycharesteristic.mainNominalCurrent = this.nominalCurrent
    this.supplycharesteristic.mainLoopImpedance = this.loopImpedence

   
     
    //console.log (this.supplycharesteristicForm.get('live')?.value); 
      

   this.myValue = this.supplycharesteristicForm.get('alternateArr.live')?.value;

    console.log(this.supplycharesteristic);
    console.log(this.supplycharesteristicForm.value.circuitArr);
    console.log(this.supplycharesteristicForm.value.location1Arr);
    console.log(this.supplycharesteristicForm.value.location2Arr);
    console.log(this.supplycharesteristicForm.value.location3Arr);
    console.log(this.supplycharesteristicForm.value.alternateArr);
}

















}




