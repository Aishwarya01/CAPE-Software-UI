// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentName: 'dev',
  apiUrl: 'http://localhost:5005/api/v1',
  apiUrl_EMC: 'http://localhost:5002/api/emc/v1',
  sessionTimeOut: 6000,
  apiUrl_v2: 'http://localhost:5000/api/v2',
  apiUrl_LPS: 'http://localhost:5001/api/lps/v1',
  apiUrl_RISK: 'http://localhost:5003/api/risk/v2',
  apiUrl_Diagram: 'http://localhost:5005/api/diagram/v1',
  hoursOfGettingApproved: 2,
  signInContent: 'IEC 60364 gives the rules for the design, erection, and verification of electrical installations up to 1000 V AC and 1500 V DC. These rules are adopted/followed worldwide as wiring rules. Some of the adopted national versions of this standard are BS7671 in UK, VDE0100 in Germany … etc. The NFPA 70 (NEC) of USA closely follows the fundamental safety measures recommended in IEC 60364.  In India the standard is adopted as IS732 for general installations and Part 3 of National Building Code of India part 3 for special locations.  The rules are intended to provide for the safety of persons, livestock and property against dangers and damage which may arise in the reasonable use of electrical installations and to provide for the proper functioning of those installations. The rules are applicable in design, erection and verification of electrical installations such as residential, commercial, public, industrial, agricultural and horticultural, prefabricated buildings, caravans, caravan sites and similar sites, construction sites, exhibitions, fairs and other installations for temporary purposes, marinas, external lighting and similar installations, medical locations, mobile or transportable units, photovoltaic systems, low-voltage generating sets etc. Verification ensures safety of the installation and its conformity to the standard in design, selection and erection of the installation. Initial and periodic verifications are necessary.',
  shapes:[
    {imageSource: '../../assets/img/Generator.png', imageName: 'Generator', id: 1},
    {imageSource: '../../assets/img/ACB.png', imageName: 'ACB', id: 2},
    {imageSource: '../../assets/img/Breaker1.png', imageName: 'Breaker1', id: 3},
    {imageSource: '../../assets/img/Distribution board.png', imageName: 'Distribution board', id: 4},
    {imageSource: '../../assets/img/Generator.png', imageName: 'Generator', id: 5},
    {imageSource: '../../assets/img/Light.png', imageName: 'Light', id: 6},
    {imageSource: '../../assets/img/MCB.png', imageName: 'MCB', id: 7},
    {imageSource: '../../assets/img/MCB_with_RCD.png', imageName: 'MCB_with_RCD', id: 8},
    {imageSource: '../../assets/img/MCCB.png', imageName: 'MCCB', id: 9},
    {imageSource: '../../assets/img/motor.png', imageName: 'Motor', id: 10},
    {imageSource: '../../assets/img/Transformer_delta_delta.png', imageName: 'Transformer_delta_delta', id: 11},
    {imageSource: '../../assets/img/Transformer_delta_star.png', imageName: 'Transformer_delta_star', id: 12},
    {imageSource: '../../assets/img/Transformer_star_delta.png', imageName: 'Transformer_star_delta', id: 13},
    {imageSource: '../../assets/img/Transformer_star_star.png', imageName: 'Transformer_star_star', id: 14}, 
    {imageSource: '../../assets/img/Wire.png', imageName: 'Wire', id: 15}, 
    {imageSource: '../../assets/img/Capacitor.png', imageName: 'Capacitor', id: 16},
    {imageSource: '../../assets/img/Inductor.png', imageName: 'Inductor', id: 17},
    {imageSource: '../../assets/img/Diode.png', imageName: 'Diode', id: 18},
    {imageSource: '../../assets/img/Resistor.png', imageName: 'Resistor', id: 19},
    {imageSource: '../../assets/img/Ground1.png', imageName: 'Ground1', id: 20},
    {imageSource: '../../assets/img/PortableAppliance.png', imageName: 'PortableAppliance', id: 21},
    {imageSource: '../../assets/img/Fan.png', imageName: 'Fan', id: 22},
    {imageSource: '../../assets/img/DieselGenerator.png', imageName: 'DieselGenerator', id: 23},
    {imageSource: '../../assets/img/EquipBond.png', imageName: 'EquipBond', id: 24}
    ],
};

export class SuperAdminLocal {
  adminEmail: any=[];  
  riskAdminEmail: any=[];
  constructor() {
      this.email();
      this.riskAdminEmailDetails();
  }
  email(){
    this.adminEmail[0] = 'sd@capeindia.net';
    this.adminEmail[1] = 'arunkumar.k@capeindia.net';
    this.adminEmail[2] = 'thirumoorthy@capeindia.net';
    this.adminEmail[3] = 'elangovan.m@capeindia.net';
    this.adminEmail[4] = 'aishwarya@capeindia.net';
  }       
  riskAdminEmailDetails(){
    this.riskAdminEmail[0] = 'awstesting@rushforsafety.com';
    this.riskAdminEmail[1] = 'gk@capeindia.net';
    this.riskAdminEmail[2] = 'vinoth@capeindia.net';
    this.riskAdminEmail[3] = 'krishna.kumar@capeindia.net';
    this.riskAdminEmail[4] = 'manoj@capeindia.net';
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
