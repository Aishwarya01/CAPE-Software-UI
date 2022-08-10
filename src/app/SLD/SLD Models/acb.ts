export class ACB {
  acbID!: number;
  nodeId!: String;
  fileName!: String;
  userName!: String;
  referenceName!: String;
  manufacturerName!: String;
  ocpdType!: String;
  rating!: number;
  voltage!: number;
  noOfPoles!: String;
  relayManufacturer!: String;
  model!: String;
  overcurrent!: number;
  setTimes!: number;
  earthFault!: number;
  setTime!: number;
  overvoltage!: String;
  setVoltage!: number;
  settTime!: number;
  updatedBy!: String;
  createdDate!: Date; 
  createdBy!: String;
  updatedDate!: Date;

  generalTestingACB!: GeneralTestingACB[];
  safetyTestingACB!: SafetyTestingACB[];
}

export class GeneralTestingACB {
  rN!: String;
  yN!: String;
  bN!: String;
  rE!: String;
  yE!: String;
  bE!: String;
  rY!: String;
  yB!: String;
  bR!: String;
  nE!: String;
  iRCurrent!: number;
  iYCurrent!: number;
  iBCurrent!: number;
  iNCurrent!: number;
  iPECurrent!: number;
  powerFactor!: String;
  frequency!: String;    
}

export class SafetyTestingACB {
  rN!: String;
  yN!: String;
  bN!: String;
  rE!: String;
  yE!: String;
  bE!: String;
  rY!: String;
  yB!: String;
  bR!: String;
}

