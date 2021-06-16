import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
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
  nominalVoltage: String ="";
  
  nominalFrequencyArr: any = [];
  nominalFrequency: String ="";

  nominalCurrentArr: any = [];
  nominalCurrent: String ="";
  
  loopImpedenceArr: any = [];
  loopImpedence: String ="";

  // Alternate table array
  nominalVoltageArr1: any = [];

  panelOpenState = false;
  systemEarthingList: String[]= ['TN-C','TN-C-S','TN-S','IT','TT'];
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
        aLSupplyNo:new FormControl(''),
        aLSupplyShortName:new FormControl(''),
        aLSystemEarthing:new FormControl(''),
        aLLiveConductorType:new FormControl(''),
        aLLiveConductorAC:new FormControl(''),
        aLLiveConductorDC:new FormControl(''),
        aLLiveConductorBNote: new FormControl(''),
        nominalVoltage: new FormControl(''),
        nominalFrequency: new FormControl(''),
        faultCurrent: new FormControl(''),
        loopImpedance: new FormControl(''),
        installedCapacity: new FormControl(''),
        actualLoad: new FormControl(''),       
        nominalVoltageArr1: this.formBuilder.array([
          this.nominalVoltageForm()
        ]),
        ratedCurrent : new FormControl(''),    
        currentDissconnection : new FormControl(''),    
      })
    }

    nominalVoltageForm() : FormGroup {
      return new FormGroup({
        nominalVoltage1:new FormControl(''),
        nominalVoltage2:new FormControl(''),
        nominalVoltage3:new FormControl(''),
        nominalVoltage4:new FormControl(''),
        nominalVoltage5:new FormControl(''),
        nominalVoltage6:new FormControl(''),
        nominalVoltage7:new FormControl(''),
        nominalVoltage8:new FormControl(''),
        nominalVoltage9:new FormControl(''),


        nominalFrequency1: new FormControl(''),
        nominalFrequency2: new FormControl(''),
        nominalFrequency3: new FormControl(''),
        nominalFrequency4: new FormControl(''),
        nominalFrequency5: new FormControl(''),
        nominalFrequency6: new FormControl(''),
        nominalFrequency7: new FormControl(''),
        nominalFrequency8: new FormControl(''),
        nominalFrequency9: new FormControl(''),


        current1: new FormControl(''),
        current2: new FormControl(''),
        current3: new FormControl(''),
        current4: new FormControl(''),
        current5: new FormControl(''),
        current6: new FormControl(''),
        current7: new FormControl(''),
        current8: new FormControl(''),
        current9: new FormControl(''),


        impedence1: new FormControl(''),
        impedence2: new FormControl(''),
        impedence3: new FormControl(''),
        impedence4: new FormControl(''),
        impedence5: new FormControl(''),
        impedence6: new FormControl(''),
        impedence7: new FormControl(''),
        impedence8: new FormControl(''),
        impedence9: new FormControl(''),


        capacity: new FormControl(''),

        loadCurrent1: new FormControl(''),
        loadCurrent2: new FormControl(''),
        loadCurrent3: new FormControl(''),
        loadCurrent4: new FormControl(''),

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
  getTableArray(form: any) {
    return form.controls.nominalVoltageArr1.controls
  }

  changeCurrent(e: any) {
    let changedValue = e.target.value;
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
    this.nominalVoltageArr.push(this.NV1,this.NV2,this.NV3,this.NV4,this.NV5,this.NV6,this.NV7,this.NV8,this.NV9);
    this.nominalFrequencyArr.push(this.NF1,this.NF2,this.NF3,this.NF4,this.NF5,this.NF6,this.NF7,this.NF8,this.NF9);
    this.nominalCurrentArr.push(this.PF1,this.PF2,this.PF3,this.PF4,this.PF5,this.PF6,this.PF7,this.PF8,this.PF9);
    this.loopImpedenceArr.push(this.EL1,this.EL2,this.EL3,this.EL4,this.EL5,this.EL6,this.EL7,this.EL8,this.EL9);

    // alternate
    this.alternateArr = this.supplycharesteristicForm.get('alternateArr') as FormArray;

    // first table
    for(let i of this.nominalVoltageArr) {
      if(i != undefined) {
        this.nominalVoltage += i+",";
      }
    }


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


    for(let i of this.alternateArr.value) {
      let arr: any=[];
        let arr1: any=[];
        let arr2: any=[];
        let arr3: any=[];
        let arr4: any=[];
        let arr5: any=[];
      for(let j of i.nominalVoltageArr1) {  
        arr.push(j.nominalVoltage1,j.nominalVoltage2,j.nominalVoltage3,j.nominalVoltage4,j.nominalVoltage5,j.nominalVoltage6,j.nominalVoltage7,j.nominalVoltage8,j.nominalVoltage9)
        arr1.push(j.nominalFrequency1,j.nominalFrequency2,j.nominalFrequency3,j.nominalFrequency4,j.nominalFrequency5,j.nominalFrequency6,j.nominalFrequency7,j.nominalFrequency8,j.nominalFrequency9)
        arr2.push(j.current1,j.current2,j.current3,j.current4,j.current5,j.current6,j.current7,j.current8,j.current9)
        arr3.push(j.impedence1,j.impedence2,j.impedence3,j.impedence4,j.impedence5,j.impedence6,j.impedence7,j.impedence8,j.impedence9)
        arr4.push(j.capacity)
        arr5.push(j.loadCurrent1,j.loadCurrent2,j.loadCurrent3,j.loadCurrent4)
      }
  
      let nominalVoltage: String="";
      let nominalFrequency: String="";
      let faultCurrent: String="";
      let impedance: String="";
      let capacity: String="";
      let loadCurrent: String="";



      for(let a of arr) {
        if(a != "") {
          nominalVoltage += a+",";
        }
      } 

      i.nominalVoltage = nominalVoltage;

      for(let b of arr1) {
        if(b != "") {
          nominalFrequency += b+",";
        }
      }

      i.nominalFrequency = nominalFrequency;


      for(let c of arr2) {
        if(c != "") {
          faultCurrent += c+",";
        }
      }

      i.faultCurrent = faultCurrent;


      for(let d of arr3) {
        if(d != "") {
          impedance += d+",";
        }
      }

      i.loopImpedance = impedance;

      for(let e of arr4) {
        if(e != "") {
          capacity = e;
        }
      }

      i.installedCapacity = capacity;

      for(let f of arr5) {
        if(f != "") {
          loadCurrent += f+",";
        }
      }

      i.actualLoad = loadCurrent;

    }

    // for(let i of this.alternateArr.controls) {
    //   i.controls.removeControl('nominalVoltageArr1');
    // }


    this.supplycharesteristic.Supplyparameters = this.supplycharesteristicForm.value.alternateArr


    this.supplycharesteristic.mainNominalVoltage = this.nominalVoltage
    this.supplycharesteristic.mainNominalFrequency = this.nominalFrequency
    this.supplycharesteristic.mainNominalCurrent = this.nominalCurrent
    this.supplycharesteristic.mainLoopImpedance = this.loopImpedence

    console.log(this.supplycharesteristic)
    this.supplyCharacteristicsService.addSupplyCharacteristics(this.supplycharesteristic).subscribe(
      data=> {
        console.log("worked");
      },
      error => {
        console.log("error");
      }
      )
    
}

















}




