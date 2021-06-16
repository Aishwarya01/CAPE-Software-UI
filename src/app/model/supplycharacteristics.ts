export class Supplycharacteristics {
    supplyCharacteristicsId:number;
    userName:String;
    siteId:number;
    mainSystemEarthing:String;
    systemEarthingBNote:String;
    liveConductorType:String;
    liveConductorAC:String;
    liveConductorDC:String;
    liveConductorBNote:String;
    mainNominalVoltage:String;
    mainNominalFrequency:String;
    mainNominalCurrent:String;
    mainLoopImpedance:String;
    mainNominalProtectiveDevice:String;
    mainRatedCurrent:String;
    mainCurrentDisconnection:String;
    alternativeSupply:String;
    supplyNumber:number;
    maximumDemand:String;
    maximumLoad:String;
    meansEarthing:String;
    electrodeType:String;
    electrodeMaterial:String;
    noOfLocation:String;
    conductorSize:number;
    conductormaterial:String;
    conductorVerify:boolean;
    bondingConductorSize:number;
    bondingConductorMaterial:String;
    bondingConductorVerify:boolean;
    bondingJointsType:String;
    bondingNoOfJoints:number;
    earthingConductorSize:number;
    earthingConductorMaterial:String;
    earthingConductorVerify:boolean;
    earthingJointsType:String;
    earthingNoOfJoints:number;
    createdDat:Date;

    Supplyparameters: Supplyparameters[];
    Circuitbreaker:Circuitbreaker[];
    Locationreport:Locationreport[];
}
export class Supplyparameters {
  supplyparametersId:number;
  aLSystemEarthing:String;
  aLSupplyNo:String;
  aLSupplyShortName:String;

  aLSystemEarthingBNote:String;
  
  aLLiveConductorType:String;
  aLLiveConductorAC:String;
  aLLiveConductorDC:String;
  aLLiveConductorBNote:String;

  nominalVoltage:String;
  nominalFrequency:String;
  faultCurrent:String;
  loopImpedance:String;
  installedCapacity:String;
  actualLoad:String;

  ratedCurrent:String;
  currentDissconnection:String;
}
export class Circuitbreaker{
  circuitBreakerId:number;
  location:String;
  type:String;
  currentCurveType:String;
  noPoles:String;
  current:String;
  voltage:String;
  fuse:String;
  residualCurrent:String;
  residualTime:String;
 
}
export class Locationreport{

  locationReportId:string;
  particularInstalOrProtectiveConductor:string;
  boundingOrEarthing:string;
  locationNo:string;
  locationName:string;
  electrodeResistanceEarth:string;
  electrodeResistanceGird:string;
  jointNo:string;
  jointResistance:string;
}

