export class Testingdetails {
    siteId!: number;
  userName!: String;
  testEngineerName!: String;
  date!: Date;
  detailsTestInstrument!: String;
  continuity!: String;
  insulationResisance!: String;
  rcd!: String;
  earthElectrodeResistance!: String;
  designation!: String;
  companyName!: String;
  Impedance!:String;
  
  
  distributionIncomingValue!: DistributionIncomingValue[];
  testDistribution!: TestDistribution[];
  testCircuit!:TestCircuit[];
  testConductor!:TestConductor[];
  testContinuity!:TestContinuity[];
  testVoltage!:TestVoltage[];
  testLoopImpedance!:TestLoopImpedance[];
  testFaultCurrent!:TestFaultCurrent[];
  testDisconnectionTime!:TestDisconnectionTime[];
  testRcd!: TestRcd[];
  
  }
  
  
  
   export class TestDistribution{
  
  distributionBoardDetails!: String;
  referance!: String;
  location!: String;
  correctSupplyPolarity!: String;
  numOutputCircuitsUse!: String;
  ratingsAmps!: String;
  numOutputCircuitsSpare!: String;
  installedEquipmentVulnarable!: String;
   }
  
  export class DistributionIncomingValue{
  
  incomingVoltage!: String;
  incomingZs!: String;
  incomingIpf!: String;
  
  }
  //  {
  //  incomingVoltage!: String;
  //  incomingZs!: String;
  //  incomingIpf!: String;
  //  }
  //  ]
  //  },
  
  export class TestCircuit {
  circuitNo!: String;
  description!: String;
  standardNo!: String;
  type!: String;
  rating!: String;
  breakingCapacity!: String;
  }
  
  export class  TestConductor {
  installationReferanceMethod!: String;
  live!: String;
  Integer!: String;
  
  }
  
  export class TestContinuity {
  approximateLength!: String;
  rRContinuity!: String;
  rContinuity!: String;
  lLContinuity!: String;
  lEContinuity!: String;
  polarity!: String;
  }
  
  export class TestVoltage {
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
  
  export class TestLoopImpedance {
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
  
  export class TestFaultCurrent {
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
  
  export class TestDisconnectionTime {
  ryDisconnect!: String;
  rbDisconnect!: String;
  ybDisconnect!: String;
  rnDisconnect!: String;
  ynDisconnect!: String;
  bnDisconnect!: String;
  rpeDisconnect!: String;
  ypeDisconnect!: String;
  bpeDisconnect!: String;
  
  }
  
  export class  TestRcd {
  
  rcdCurrent!: String;
  operatingCurrent!: String;
  operatingFiveCurrent!: String;
  testButtonOperation!: String;
  remarks!: String;
  
  
  }
  
  
  