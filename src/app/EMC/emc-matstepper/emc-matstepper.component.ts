import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';
import { EmcFacilityDataComponent } from '../emc-facility-data/emc-facility-data.component';
import { PowerAndEarthingDataComponent } from '../emc-power-and-earthing-data/power-and-earthing-data.component';
import { EmcElectromagneticCompatibilityDataComponent } from '../emc-electromagnetic-compatibility-data/emc-electromagnetic-compatibility-data.component';
import { EmcSavedReportComponent } from '../emc-saved-report/emc-saved-report.component';
import { EmcSavedReportService } from 'src/app/EMC_Services/emc-saved-report.service';
import { EmcFinalReportComponent } from '../emc-final-report/emc-final-report.component';
import { EmcClientDetailsComponent } from '../emc-client-details/emc-client-details.component';
import { GlobalsService } from 'src/app/globals.service';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationBoxComponent } from 'src/app/confirmation-box/confirmation-box.component';

@Component({
  selector: 'app-emc-matstepper',
  templateUrl: './emc-matstepper.component.html',
  styleUrls: ['./emc-matstepper.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class EmcMatstepperComponent implements OnInit {

  firstFormGroup!: FormGroup;

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  selectedIndex: any;
  // Completed: boolean = true;
  // Completed1: boolean = true;
  // Completed2: boolean = true;
  // Completed3: boolean = true;

  @ViewChild(EmcClientDetailsComponent)
  clientData!: EmcClientDetailsComponent;
  @ViewChild(EmcFacilityDataComponent)
  facility!: EmcFacilityDataComponent;
  @ViewChild(PowerAndEarthingDataComponent)
  powerAndEarthing!: PowerAndEarthingDataComponent;
  @ViewChild(EmcElectromagneticCompatibilityDataComponent)
  electroMagneticCopatibility!: EmcElectromagneticCompatibilityDataComponent;
  dataJSON: any = [];
  @ViewChild(EmcSavedReportComponent) saved!: EmcSavedReportComponent;
  @ViewChild(EmcFinalReportComponent) final!: EmcFinalReportComponent;
  @ViewChild('tabs') tabs!: MatTabGroup;

  isEditableEmc: boolean = false;
  FinalReport: boolean=false;
  
  disablepage: boolean=true;
  
  emcClientDetails: boolean=true;
  emcFacilityData: boolean=true;
  emcElectromagneticCompatibility: boolean=true;;
  emcPowerAndEarthingData: boolean=true;

  // Spinner Purpose
  spinner: boolean=false;
  spinnerValue: String = '';

  constructor(
    private _formBuilder: FormBuilder,
    private emcSavedReportService: EmcSavedReportService,
    private router: ActivatedRoute,
    public service: GlobalsService,
    private dialog: MatDialog,
    private ChangeDetectorRef: ChangeDetectorRef,) {

  }
  ngOnInit(): void {
    this.refresh();
    this.tabs._handleClick = this.interceptTabChange.bind(this);
  }



  public doSomething(next: any): void {


    this.clientData.isEditableEmc=this.isEditableEmc;
    // facilityData
    this.facility.emcId = this.clientData.emcClientDetails.emcId;
    this.facility.isEditableEmc=this.isEditableEmc;

    // powerAndEarthing
    this.powerAndEarthing.emcId = this.clientData.emcClientDetails.emcId;
    this.powerAndEarthing.isEditableEmc=this.isEditableEmc;
    // electroMagneticCopatibility
    this.electroMagneticCopatibility.emcId = this.clientData.emcClientDetails.emcId;
    this.electroMagneticCopatibility.isEditableEmc=this.isEditableEmc;
    // this.Completed = this.clientData.success;
    this.service.isLinear = false;
    this.service.isCompleted = next;
    this.saved.ngOnInit();
    this.refresh();
  }

  triggerClickTab() {
    this.clientData.gotoNextTab();
    this.facility.gotoNextTab();
    this.powerAndEarthing.gotoNextTab();
    this.electroMagneticCopatibility.gotoNextTab();
  }
  public doSomething1(next: any): void {
    this.service.isLinear = false;
    this.service.isCompleted2 = next;
    // this.Completed1 = this.facility.success;
    this.refresh();
  }

  public doSomething2(next: any): void {
    this.service.isLinear = false;

    //this.service.supplycharesteristicForm = next;
    this.service.isCompleted3 = next;

    // this.Completed2 = this.powerAndEarthing.success;
    this.refresh();
  }

  public doSomething3(next: any): void {
    //  this.Completed3 = this.electroMagneticCopatibility.success;
    this.saved.ngOnInit();
    this.final.ngOnInit();
    //this.service.isLinear=false;
    //this.service.addsummary = next;
    //this.service.isCompleted5 = next;
    if (next) {
      ///this.service.allStepsCompleted=false;
      this.selectedIndex = 2;
    }
    this.service.isLinear=false;
    this.service.isCompleted4= next;
  }
  goBack2(stepper: MatStepper) {
    if(this.facility.reloadFromBack()){
      stepper.previous();
      //this.service.goBacktoprevious=true;
    }
  }
  goBack3(stepper: MatStepper) {
    if(this.powerAndEarthing.reloadFromBack()){
      stepper.previous();
      //this.service.goBacktoprevious=true;
    }
  }
  goBack4(stepper: MatStepper) {
    if(this.electroMagneticCopatibility.reloadFromBack()){
      stepper.previous();
      //this.service.goBacktoprevious=true;
    }
  }
  public changeTabEmcSavedReport(index: number, emcId: any, userName: any,flag: any) {
    if(this.service.triggerMsgForLicense=="emcPage"){
      this.spinner=true;
      this.spinnerValue="Please wait, Details are loading...!";
    }

    this.emcClientDetails=false;
    this.emcFacilityData=false;
    this.emcElectromagneticCompatibility=false;
    this.emcPowerAndEarthingData=false;
    setTimeout(() => {
      this.emcClientDetails=true;
      this.emcFacilityData=true;
      this.emcElectromagneticCompatibility=true;;
      this.emcPowerAndEarthingData=true;
    }, 1);
    setTimeout(() => {
      this.emcSavedReportService.retrieveFinalEmcReport(userName, emcId).subscribe(
        (data) => {
          this.saved.savedReportSpinner = false;
          this.saved.savedReportBody = true;

          this.final.finalReportSpinner= false;
          this.final.finalReportBody = true;

          this.dataJSON = JSON.parse(data);

          if (this.dataJSON.clientDetails != null
            && this.dataJSON.facilityData != null
            && this.dataJSON.powerEarthingData != null
            && this.dataJSON.electromagneticCompatability != null) {
            this.service.disableSubmitElectromagnetic = true;
          }
          else{
            this.service.disableSubmitElectromagnetic = false;
          }
          if (this.dataJSON.clientDetails != null) {
            this.selectedIndex = index;

              if(this.service.headerMsg=="emcPage"){
                this.service.triggerMsgForLicense="emcPage";
              }else{
                this.service.triggerMsgForLicense="";
              }

            this.clientData.retrieveDetailsfromSavedReports(userName, emcId, this.dataJSON);
            this.doSomething(false);
            //   this.Completed = true;

            if (this.dataJSON.facilityData != null) {
              this.facility.retrieveDetailsfromSavedReports(userName, emcId, this.dataJSON);
              this.doSomething1(false);
              // this.Completed1 = true;

              if (this.dataJSON.powerEarthingData != null) {
                this.powerAndEarthing.retrieveDetailsfromSavedReports(userName, emcId, this.dataJSON);
                this.doSomething2(false);
                //  this.Completed2 = true;

                if (this.dataJSON.electromagneticCompatability != null) {
                  this.electroMagneticCopatibility.retrieveDetailsfromSavedReports(userName, emcId, this.dataJSON);
                  this.doSomething3(false);
                  //this.Completed3 = true;
                }
              }
            }
          }
        },
        (error) => {

        }
      )
      this.spinner=false;
      this.spinnerValue="";
    }, 3000);
  }

  // Final Report 
  // changeTab1(index: number): void {
  //   this.ngOnInit();
  //   let userName=this.router.snapshot.paramMap.get('email') || '{}';
  //   // this.changeTabEmcSavedReport(index,this.emcClientDetails.emcId,userName,this.emcClientDetails.ClientName);
  //   this.selectedIndex = index;
  // }

  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }

  public savedReportFunction(e: any) {
    this.continue(e.emcId,e.clientName,e.flag);
  }

  public finalReportFunction(e: any) {
    this.preview(e.emcId,e.clientName,e.flag);
  }

  // Final Report 
  preview(emcId: any, ClientName: any,flag:any): void {
    this.refresh();
    this.ngOnInit();
     this.isEditableEmc = true;
    let userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.changeTabEmcSavedReport(0, emcId, userName,flag);

  }

  continue(emcId: any, ClientName: any,flag:any): void {
    this.refresh();
    this.ngOnInit();
    this.isEditableEmc = false;
    //  this.final.finalReportSpinner = false;
    //  this.final.finalReportBody = true;
    let userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.changeTabEmcSavedReport(0, emcId, userName,flag);
  }

  interceptTabChange(tab: MatTab, tabHeader: MatTabHeader) {

    if((this.service.emcClick==1 && this.isEditableEmc && !this.FinalReport) || (this.clientData.EmcClientDetailsForm.dirty || this.facility.EMCFacilityForm.dirty || this.powerAndEarthing.EMCPowerAndEarthForm.dirty || this.electroMagneticCopatibility.EMCElectroMagneticFormm.dirty))
       {
        const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
          width: '420px',
          maxHeight: '90vh',
          disableClose: true,
        });
        dialogRef.componentInstance.triggerModal = true;
    
        dialogRef.componentInstance.confirmBox.subscribe(data=>{
          if(data) {
            if(tab.textLabel == "Saved Reports"){
              this.selectedIndex=1; 
              this.service.emcId = 0;

              // Making all forms as untouched or printine state
              this.clientData.EmcClientDetailsForm.markAsPristine();
              this.facility.EMCFacilityForm.markAsPristine();
              this.powerAndEarthing.EMCPowerAndEarthForm.markAsPristine();
              this.electroMagneticCopatibility.EMCElectroMagneticFormm.markAsPristine();

              // Removing form data
              this.emcClientDetails = false;
              this.emcFacilityData = false;
              this.emcPowerAndEarthingData = false;
              this.emcElectromagneticCompatibility = false;
              setTimeout(() => {
                this.emcClientDetails = true;
                this.emcFacilityData = true;
                this.emcPowerAndEarthingData = true;
                this.emcElectromagneticCompatibility = true;
              }, 1000);

              this.isEditableEmc;
              // File Delete purpose
              if ((this.facility.EMCFacilityForm.dirty && this.facility.EMCFacilityForm.touched) || 
              (this.powerAndEarthing.EMCPowerAndEarthForm.dirty && this.powerAndEarthing.EMCPowerAndEarthForm.touched)) {
                // this.fileUploadService.removeUnusedFiles(this.airTermination.basicLpsId).subscribe();
                // ab need to check service calls
              }
            }
            else if(tab.textLabel == "Final Reports"){
              this.selectedIndex=2; 
              this.service.emcId = 0;

              // Making all forms as untouched or printine state
              this.clientData.EmcClientDetailsForm.markAsPristine();
              this.facility.EMCFacilityForm.markAsPristine();
              this.powerAndEarthing.EMCPowerAndEarthForm.markAsPristine();
              this.electroMagneticCopatibility.EMCElectroMagneticFormm.markAsPristine();

              this.isEditableEmc;

               // Removing form data
               this.emcClientDetails = false;
               this.emcFacilityData = false;
               this.emcPowerAndEarthingData = false;
               this.emcElectromagneticCompatibility = false;
               setTimeout(() => {
                 this.emcClientDetails = true;
                 this.emcFacilityData = true;
                 this.emcPowerAndEarthingData = true;
                 this.emcElectromagneticCompatibility = true;
               }, 1000);

              // File Delete purpose
              // if ((this.facility.EMCFacilityForm.dirty && this.facility.EMCFacilityForm.touched && !this.airTermination.fileFalg) || 
              // (this.powerAndEarthing.EMCPowerAndEarthForm.dirty && this.powerAndEarthing.EMCPowerAndEarthForm.touched && !this.downConductors.fileFlag)) {
              //   // this.fileUploadService.removeUnusedFiles(this.airTermination.basicLpsId).subscribe();
              //                   // ab need to check service calls
              // }
            }
            else if(tab.textLabel=="Lightning Protection System"){
              this.selectedIndex=0;
              this.service.emcId = 0;
            }
            this.service.windowTabClick=0;
            this.service.logoutClick=0; 
            this.service.emcClick=0; 
          }
          else{
            return;
          }
        })
    }
    else if(((this.service.emcClick==0) || (this.service.allStepsCompleted== true) && this.isEditableEmc) || this.clientData){
        this.service.windowTabClick=0;
        this.service.logoutClick=0;
        this.service.emcClick=0; 
        const tabs = tab.textLabel;
        if((tabs==="Electro Magnetic Compatibility"))  {
             this.selectedIndex=0; 
        }
        else if((tabs==="Saved Reports")){
          this.selectedIndex=1;
          this.service.triggerMsgForLicense="";
          this.service.headerMsg="";
          if(this.clientData.emcClientDetails.emcId != undefined){
            // this.saved.retrieveLpsDetails();
            this.saved.disablepage=true;
          }
        }    
        else{
          this.selectedIndex=2; 
        }        
    }
    else{
      this.service.windowTabClick=0;
      this.service.logoutClick=0;
      this.service.emcClick=0; 
    }
  }
}
