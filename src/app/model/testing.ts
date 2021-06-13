export class Testing {
    
    testEngineerName!: String;
    date!: Date;
    detailsTestInstrument!: String;
    continuity!: String;
    insulationResisance!: String;
    rcd!: String;
    earthElectrodeResistance!: String;
    designation!: String;
    companyName!: String;
    testRcd!: testRcd[];
    testDisconnectionTime!:testDisconnectionTime[];
    testFaultCurrent!:testFaultCurrent[];
    testLoopImpedance!:testLoopImpedance[];
    testVoltage!:testVoltage[];
    testContinuity!:testContinuity[];
    testConductor!:testConductor[];
    testCircuit!:testCircuit[];
}



     export class testDistribution{

 distributionBoardDetails!: String;
 referance!: String;
 location!: String;
 correctSupplyPolarity!: String;
 numOutputCircuitsUse!: String;
 ratingsAmps!: String;
 numOutputCircuitsSpare!: String;
 installedEquipmentVulnarable!: String;
     }

//  distributionIncomingValue:[{

//  incomingVoltage!: String,
//  incomingZs!: String;
//  incomingIpf!: String;

//  }
//  {
//  incomingVoltage!: String;
//  incomingZs!: String;
//  incomingIpf!: String;
//  }
//  ]
//  },

  export class testCircuit {
 circuitNo!: String;
 description!: String;
 standardNo!: String;
 type!: String;
 rating!: String;
 breakingCapacity!: String;
 }

 export class  testConductor {
 installationReferanceMethod!: String;
 live!: String;
 Integer!: String;

 }

  export class testContinuity {
 approximateLength!: String;
 rRContinuity!: String;
 rContinuity!: String;
 lLContinuity!: String;
 lEContinuity!: String;
 polarity!: String;
 }

   export class testVoltage {
 ryVoltage!: String;
 rbVoltage!: String;
 ybVoltage!: String;
 rnVoltage!: String;
 ynVoltage!: String;
 bnVoltage!: String;
 rpeVoltage!: String;
 ypeVoltage!: String;
 bpeVoltage!: String;
 }

  export class testLoopImpedance {
    ryLoopImpedance!: String;
 rbLoopImpedance!: String;
 ybLoopImpedance!: String;
 rnLoopImpedance!: String;
 ynLoopImpedance!: String;
 bnLoopImpedance!: String;
 rpeLoopImpedance!: String;
 ypeLoopImpedance!: String;
 bpeLoopImpedance!: String;


 }

  export class testFaultCurrent {
    ryFaultCurrent!: String;
  rbFaultCurrent!: String;
 ybFaultCurrent!: String;
 rnFaultCurrent!: String;
 ynFaultCurrent!: String;
 bnFaultCurrent!: String;
 rpeFaultCurrent!: String;
 ypeFaultCurrent!: String;
 bpeFaultCurrent!: String;


 }

  export class testDisconnectionTime {

 rbDisconnect!: String;
 ybDisconnect!: String;
 rnDisconnect!: String;
 ynDisconnect!: String;
 bnDisconnect!: String;
 rpeDisconnect!: String;
 ypeDisconnect!: String;
 bpeDisconnect!: String;

 }

export class  testRcd {

rcdCurrent!: String;
operatingCurrent!: String;
operatingFiveCurrent!: String;
testButtonOperation!: String;
remarks!: String;


}


