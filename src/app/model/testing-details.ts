export class TestingDetails {
  siteId!: number;
  userName!: String;
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
  // testConductor!:TestConductor[];
  // testContinuity!:TestContinuity[];
  // testVoltage!:TestVoltage[];
  // testLoopImpedance!:TestLoopImpedance[];
  // testFaultCurrent!:TestFaultCurrent[];
  // testDisconnectionTime!:TestDisconnectionTime[];
  // testRcd!: TestRcd[];
  
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
  installationReferanceMethod!: String;
  live!: String;
  pecpc!: String;
  approximateLength!: String;
  rRContinuity!: String;
  rContinuity!: String;
  lLContinuity!: String;
  lEContinuity!: String;
  polarity!: String;
  ryVoltage!: String;
  rbVoltage!: String;
  ybVoltage!: String;
  rnVoltage!: String;
  ynVoltage!: String;
  bnVoltage!: String;
  rpeVoltage!: String;
  ypeVoltage!: String;
  bpeVoltage!: String;
  ryLoopImpedance!: String;
  rbLoopImpedance!: String;
  ybLoopImpedance!: String;
  rnLoopImpedance!: String;
  ynLoopImpedance!: String;
  bnLoopImpedance!: String;
  rpeLoopImpedance!: String;
  ypeLoopImpedance!: String;
  bpeLoopImpedance!: String;
  ryFaultCurrent!: String;
  rbFaultCurrent!: String;
  ybFaultCurrent!: String;
  rnFaultCurrent!: String;
  ynFaultCurrent!: String;
  bnFaultCurrent!: String;
  rpeFaultCurrent!: String;
  ypeFaultCurrent!: String;
  bpeFaultCurrent!: String;
  ryDisconnect!: String;
  rbDisconnect!: String;
  ybDisconnect!: String;
  rnDisconnect!: String;
  ynDisconnect!: String;
  bnDisconnect!: String;
  rpeDisconnect!: String;
  ypeDisconnect!: String;
  bpeDisconnect!: String;
  rcdCurrent!: String;
  operatingCurrent!: String;
  operatingFiveCurrent!: String;
  testButtonOperation!: String;
  remarks!: String;
  
  }
  
  // export class  TestConductor { }
  
  // export class TestContinuity {}
  
  // export class TestVoltage {}
  
  // export class TestLoopImpedance {}
  
  // export class TestFaultCurrent {}
  
  // export class TestDisconnectionTime {}
  
  // export class  TestRcd {}
