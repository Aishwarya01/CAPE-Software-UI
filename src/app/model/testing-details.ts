export class TestingDetails{
  siteId!: number;
  userName!: String;
    testing!:Testing[];
    
  


 
}
export class Testing{
  locationNumber!: String;
  locationName!: String;
  testEngineerName!: String;
  date!: Date;
  detailsTestInstrument!: String;
  continuity!: String;
  insulationResisance!: String;
  rcd!: String;
  earthElectrodeResistance!: String;
  designation!: String;
  companyName!: String;
  Impedance!: String;
  testingDistribution!: TestDistribution[];
  testingRecords!: TestingRecords[];

  
 
}



export class TestDistribution {

  distributionBoardDetails!: String;
  referance!: String;
  location!: String;
  correctSupplyPolarity!: String;
  numOutputCircuitsUse!: String;
  ratingsAmps!: String;
  numOutputCircuitsSpare!: String;
  installedEquipmentVulnarable!: String;
  incomingVoltage!: String;
  incomingZs!: String;
  incomingIpf!: String;
  
}



export class TestingRecords {
  circuitNo!: String;
  circuitDesc!: String;
  circuitStandardNo!: String;
  circuitType!: String;
  circuitRating!: String;
  circuitBreakingCapacity!: String;
  conductorInstallation!: String;
  conductorLive!: String;
  conductorPecpc!: String;
  continutiyApproximateLength!: String;
  continutiyRR!: String;
  continutiyR!: String;
  continutiyLL!: String;
  continutiyLE!: String;
  continutiyPolarity!: String;


  testVoltage!: String;
  testLoopImpedance!: String;
  testFaultCurrent!: String;
  disconnectionTime!: String;

  rcdCurrent!: String;
  rcdOperatingCurrent!: String;
  rcdOperatingFiveCurrent!: String;
  testButtonOperation!: String;
  rcdRemarks!: String;

}

 
  
