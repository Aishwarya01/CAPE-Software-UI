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
  Completed: boolean = true;
  Completed1: boolean = true;
  Completed2: boolean = true;
  Completed3: boolean = true;

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

  isEditable: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private emcSavedReportService: EmcSavedReportService,
    private router: ActivatedRoute,
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

    this.Completed = this.clientData.success;
    this.saved.ngOnInit();
    this.refresh();
  }

  public doSomething1(next: any): void {
    this.Completed1 = this.facility.success;
    this.refresh();
  }

  public doSomething2(next: any): void {
    this.Completed2 = this.powerAndEarthing.success;
    this.refresh();
  }

  public doSomething3(next: any): void {
    this.Completed3 = this.electroMagneticCopatibility.success;
    this.final.ngOnInit();
  }

  public changeTabEmcSavedReport(index: number, emcId: any, userName: any) {

    this.selectedIndex = 1;
    this.emcSavedReportService.retrieveListOfEmc(userName, emcId).subscribe(
      (data) => {
        this.dataJSON = JSON.parse(data);

        if (this.dataJSON.clientData != null) {
          this.selectedIndex = index;
          this.clientData.retrieveDetailsfromSavedReports(userName, emcId, this.dataJSON);
          this.doSomething(false);
          this.Completed = true;

          if (this.dataJSON.facility != null) {
            this.facility.retrieveDetailsfromSavedReports(userName, emcId, this.dataJSON);
            this.doSomething1(false);
            this.Completed1 = true;

            if (this.dataJSON.powerAndEarthing != null) {
              this.powerAndEarthing.retrieveDetailsfromSavedReports(userName, emcId, this.dataJSON);
              this.doSomething2(false);
              this.Completed2 = true;

              if (this.dataJSON.electroMagneticCopatibility != null) {
                this.electroMagneticCopatibility.retrieveDetailsfromSavedReports(userName, emcId, this.dataJSON);
                this.doSomething3(false);
                this.Completed3 = true;

              }
            }
          }
        }
      },
      (error) => {

      }
    )
  }
  // Final Report 
  // changeTab1(index: number): void {
  //   this.ngOnInit();
  //   let userName=this.router.snapshot.paramMap.get('email') || '{}';
  //   this.changeTabLpsSavedReport(index,this.earthStud.basicLpsId,userName,this.earthStud.ClientName);
  //   this.selectedIndex = index;
  // }

  refresh() {
    this.ChangeDetectorRef.detectChanges();
  }

  // Final Report 
  preview(emcId: any, ClientName: any): void {
    this.ngOnInit();
    this.isEditable = true;
    let userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.changeTabEmcSavedReport(0, emcId, userName);

  }

  continue(emcId: any, ClientName: any): void {
    this.refresh();
    this.ngOnInit();
    this.isEditable = false;
    let userName = this.router.snapshot.paramMap.get('email') || '{}';
    this.changeTabEmcSavedReport(0, emcId, userName);

  }
}
