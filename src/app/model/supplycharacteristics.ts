export class Supplycharacteristics {
    supplyCharacteristicsId:number;
    userName:string;
    siteId:number;
    mainSystemEarthing:string;
    systemEarthingBNote:string;
    liveConductorType:string;
    liveConductorAC:string;
    liveConductorDC:string;
    liveConductorBNote:string;
    mainNominalVoltage:String;
    mainNominalFrequency:String;
    mainNominalCurrent:String;
    mainLoopImpedance:String;
    mainNominalProtectiveDevice:string;
    mainRatedCurrent:string;
    mainCurrentDisconnection:string;
    alternativeSupply:string;
    supplyNumber:number;
    maximumDemand:string;
    maximumLoad:string;
    meansEarthing:string;
    electrodeType:string;
    electrodeMaterial:string;
    noOfLocation:number;
    conductorSize:number;
    conductormaterial:string;
    conductorVerify:boolean;
    bondingConductorSize:number;
    bondingConductorMaterial:string;
    bondingConductorVerify:boolean;
    bondingJointsType:string;
    bondingNoOfJoints:number;
    earthingConductorSize:number;
    earthingConductorMaterial:string;
    earthingConductorVerify:boolean;
    earthingJointsType:string;
    earthingNoOfJoints:number;
    createdDat:Date;

    Supplyparameters: Supplyparameters[];
    Circuitbreaker:Circuitbreaker[];
    Locationreport:Locationreport[];
}
export class Supplyparameters {
  supplyparametersId:number;
  aLSystemEarthing:string;
  aLSupplyNo:string;
  aLSupplyShortName:string;
  aLSystemEarthingBNote:string;
  aLLiveConductorType:string;
  aLLiveConductorAC:string;
  aLLiveConductorDC:string;
  aLLiveConductorBNote:string;
  nominalVoltage:String;
  nominalFrequency:string;
  faultCurrent:string;
  loopImpedance:string;
  installedCapacity:string;
  actualLoad:string;
  ratedCurrent:string;
  currentDissconnection:string;
 
}
export class Circuitbreaker{
  circuitBreakerId:number;
  location:string;
  type:string;
  currentCurveType:string;
  noPoles:string;
  current:string;
  voltage:string;
  fuse:string;
  residualCurrent:string;
  residualTime:string;
 
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

