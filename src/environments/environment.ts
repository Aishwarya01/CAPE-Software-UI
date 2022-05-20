// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentName: 'dev',
  apiUrl: 'http://localhost:5000/api/v1',
  apiUrl_EMC: 'http://localhost:5002/api/emc/v1',
  sessionTimeOut: 6000,
  apiUrl_v2: 'http://localhost:5000/api/v2',
  apiUrl_LPS: 'http://localhost:5001/api/lps/v1',
  apiUrl_RISK: 'http://localhost:5003/api/risk/v2',
  hoursOfGettingApproved: 2,
  signInContent: 'IEC 60364 gives the rules for the design, erection, and verification of electrical installations up to 1000 V AC and 1500 V DC. These rules are adopted/followed worldwide as wiring rules. Some of the adopted national versions of this standard are BS7671 in UK, VDE0100 in Germany … etc. The NFPA 70 (NEC) of USA closely follows the fundamental safety measures recommended in IEC 60364.  In India the standard is adopted as IS732 for general installations and Part 3 of National Building Code of India part 3 for special locations.  The rules are intended to provide for the safety of persons, livestock and property against dangers and damage which may arise in the reasonable use of electrical installations and to provide for the proper functioning of those installations. The rules are applicable in design, erection and verification of electrical installations such as residential, commercial, public, industrial, agricultural and horticultural, prefabricated buildings, caravans, caravan sites and similar sites, construction sites, exhibitions, fairs and other installations for temporary purposes, marinas, external lighting and similar installations, medical locations, mobile or transportable units, photovoltaic systems, low-voltage generating sets etc. Verification ensures safety of the installation and its conformity to the standard in design, selection and erection of the installation. Initial and periodic verifications are necessary.'
};

export class SuperAdminLocal {
  adminEmail: any=[];  
  constructor() {
      this.email();
  }
  email(){
    this.adminEmail[0] = 'sd@capeindia.net';
    this.adminEmail[1] = 'arunkumar.k@capeindia.net';
    this.adminEmail[2] = 'thirumoorthy@capeindia.net';
    this.adminEmail[3] = 'elangovan.m@capeindia.net';
    this.adminEmail[4] = 'aishwarya@capeindia.net';
    this.adminEmail[5] = 'hasan@capeindia.net';
    this.adminEmail[6] = 'sivaraju@capeindia.net';
  }       
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
