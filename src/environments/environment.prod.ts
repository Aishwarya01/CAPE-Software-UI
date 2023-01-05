export const environment = {
  production: true,
  environmentName: 'Production',
  apiUrl_Payment: 'https://prod.payment.safelv.net/api/v1',
  apiUrl_v2: 'https://prod.lv.safelv.net/api/v2',
  apiUrl_LPS: 'https://prod.lps.safelv.net/api/lps/v1',
  apiUrl_Diagram: 'https://prod.sld.safelv.net/api/diagram/v1',
  apiUrl_EMC: 'https://prod.emc.safelv.net/api/emc/v1',
  apiUrl_RISK: 'https://prod.riskassessment.safelv.net/api/risk/v2',
  apiUrl_EMC_LV:'https://prod.lv.safelv.net/api/v2',
  apiUrl_LPS_RISK:'https://prod.lps.safelv.net/api/v1',
  sessionTimeOut: 3600,
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
    stateGSTPercentage: 9,
    centralGSTPercentage: 9,
    integratedGSTPercentage: 18
};

// For super admin purpose
export class SuperAdminProd {
  adminEmail: any=[];  
  riskAdminEmail: any=[];
  constructor() {
      this.email();
      this.riskAdminEmailDetails();
  }
  email(){
    this.adminEmail[0] = 'awstesting@rushforsafety.com';
    this.adminEmail[1] = 'gk@capeindia.net';
    this.adminEmail[2] = 'vinoth@capeindia.net';
  }       
  riskAdminEmailDetails(){
    this.riskAdminEmail[0] = 'awstesting@rushforsafety.com';
    this.riskAdminEmail[1] = 'gk@capeindia.net';
    this.riskAdminEmail[2] = 'vinoth@capeindia.net';
    this.riskAdminEmail[3] = 'krishna.kumar@capeindia.net';
    this.riskAdminEmail[4] = 'manoj@capeindia.net';
    this.riskAdminEmail[5] = 'karthikeyan@capeindia.net';
  }         
};