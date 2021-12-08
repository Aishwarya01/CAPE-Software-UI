export class Supplycharacteristics {
  userName:String;
  siteId:number;
  supplyCharacteristicsId:number;
  shortName:String;
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
  mainActualLoad:String;
  mainNominalProtectiveDevice:String;
  mainRatedCurrent:String;
  mainCurrentDisconnection:String;
  alternativeSupply:String;
  supplyNumber:String;
  maximumDemand:String;
  maximumLoad:String;
  meansEarthing:String;
  meansEarthingRemark:String;
  electrodeType:String;
  electrodeMaterial:String;
  noOfLocation:number;
  conductorSize:String;
  conductormaterial:String;
  conductorVerify:String;
  bondingConductorSize:String;
  bondingConductorMaterial:String;
  bondingConductorVerify:String;
  bondingJointsType:String;
  bondingNoOfJoints:number;
  earthingConductorSize:String;
  earthingConductorMaterial:String;
  earthingConductorVerify:String;
  earthingJointsType:String;
  earthingNoOfJoints:number;
  createdDate!:Date;
  createdBy!: String;
  updatedBy!: String;
  updatedDate!: Date;
  supplyParameters: Supplyparameters[];
  instalLocationReport: InstallLocationReport[];
  boundingLocationReport: BoundingLocationReport[];
  earthingLocationReport: EarthingLocationReport[];
  circuitBreaker:CircuitBreaker[];
}
  export class Supplyparameters {
    supplyparametersId:number;
    aLSupplyNo:String;
    aLSupplyShortName:String;
    aLSystemEarthing:String;
    aLSystemEarthingBNote:String;
    aLLiveConductorType:String;
    aLLiveConductorAC:String;
    aLLiveConductorDC:String;
    aLLiveConductorBNote:String;
    nominalVoltage: String;
    nominalFrequency:String;
    faultCurrent:String;
    loopImpedance:String;
    installedCapacity:String;
    actualLoad:String;
    protectiveDevice: String;
    ratedCurrent:String;
    currentDissconnection:String;
    supplyParameterStatus: String;
  }

  export class CircuitBreaker{
    circuitBreakerId: number;
    location:String;
    type:String;
    sourceName: String;
    make: String;
    currentCurve: String;
    noPoles:String;
    current:String;
    voltage:String;
    fuse:String;
    typeOfResidualCurrent: String;
    residualCurrent:String;
    residualTime:String;
    circuitStatus: String;
  }

  export class InstallLocationReport{
    locationReportId: number;
    instalLocationReportStatus: String;
    locationNo:String;
    locationName:String;
    electrodeResistanceEarth:String;
    electrodeResistanceGird:String;
  }

  export class BoundingLocationReport{
    locationReportId: number;
    instalLocationReportStatus: String;
    location:String;
    jointNo:String;
    jointReference:String;
    jointResistance:String;
  }

  export class EarthingLocationReport{  
    locationReportId: number;
    instalLocationReportStatus: String;
    location:String;
    jointNo:String;
    jointReference:String;
    jointResistance:String;
  }
