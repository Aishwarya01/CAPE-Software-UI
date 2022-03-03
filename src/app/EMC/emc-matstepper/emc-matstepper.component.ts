import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmcFacilityData } from 'src/app/EMC_Model/emc-facility-data';
import { EmcFacilityDataService } from 'src/app/EMC_Services/emc-facility-data.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatTabGroup } from '@angular/material/tabs';
import { EmcFacilityDataComponent } from '../emc-facility-data/emc-facility-data.component';
import { EmcPowerAndEarthingData } from 'src/app/EMC_Model/emc-power-and-earthing-data';
import { EmcPowerAndEarthingDataService } from 'src/app/EMC_Services/emc-power-and-earthing-data.service';
import { PowerAndEarthingDataComponent } from '../emc-power-and-earthing-data/power-and-earthing-data.component';
import { EmcElectroMagneticCompabilityService } from 'src/app/EMC_Services/emc-electro-magnetic-compability.service';
import { EmcElectromagneticCompatibilityDataComponent } from '../emc-electromagnetic-compatibility-data/emc-electromagnetic-compatibility-data.component';
import { EmcSavedReportComponent } from '../emc-saved-report/emc-saved-report.component';
import { EmcSavedReportService } from 'src/app/EMC_Services/emc-saved-report.service';
import { EmcFinalReportComponent } from '../emc-final-report/emc-final-report.component';
import { EmcClientDetails } from 'src/app/EMC_Model/emc-client-details';
import { EmcClientDetailsComponent } from '../emc-client-details/emc-client-details.component';
import { GlobalsService } from 'src/app/globals.service';

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

  //isEditable: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private emcSavedReportService: EmcSavedReportService,
    private router: ActivatedRoute,
    public service: GlobalsService,
    private ChangeDetectorRef: ChangeDetectorRef,) {

  }
  ngOnInit(): void {
    this.refresh();
  }



  public doSomething(next: any): void {

    // facilityData
    this.facility.emcId = this.clientData.emcClientDetails.emcId;

    // powerAndEarthing
    this.powerAndEarthing.emcId = this.clientData.emcClientDetails.emcId;

    // electroMagneticCopatibility
    this.electroMagneticCopatibility.emcId = this.clientData.emcClientDetails.emcId;

    // this.Completed = this.clientData.success;
    this.service.isLinearEmc = false;
    this.service.isCompletedEmc = next;
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
    this.service.isLinearEmc = false;
    this.service.isCompletedEmc1 = next;
    // this.Completed1 = this.facility.success;
    this.refresh();
  }

  public doSomething2(next: any): void {
    this.service.isLinearEmc = false;

    //this.service.supplycharesteristicForm = next;
    this.service.isCompletedEmc2 = next;

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
  }

  public changeTabEmcSavedReport(index: number, emcId: any, userName: any, ClientName: any) {

    this.selectedIndex = 1;
    setTimeout(() => {
      this.emcSavedReportService.retrieveFinalEmcReport(userName, emcId).subscribe(
        (data) => {
          this.saved.savedReportSpinner = false;
          this.saved.savedReportBody = true;

          this.dataJSON = JSON.parse(data);
          if (this.dataJSON.clientDetails != null) {

            this.selectedIndex = index;
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
                  if (this.dataJSON.clientDetails != null
                    && this.dataJSON.facilityData != null
                    && this.dataJSON.powerEarthingData != null
                    && this.dataJSON.electromagneticCompatability != null) {
                    this.service.disableSubmitElectromagnetic = true;
                  }
                }
              }
            }
          }
        },
        (error) => {

        }
      )
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

  // Final Report 
  preview(emcId: any, ClientName: any): void {
    this.ngOnInit();
    // this.isEditable = true;
    let userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.changeTabEmcSavedReport(0, emcId, userName, ClientName);

  }

  continue(emcId: any, ClientName: any): void {
    this.refresh();
    this.ngOnInit();
    // this.isEditable = false;
    //  this.final.finalReportSpinner = false;
    //  this.final.finalReportBody = true;
    let userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.changeTabEmcSavedReport(0, emcId, userName, ClientName);

  }
}
