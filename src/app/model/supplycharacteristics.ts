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
    mainNominalVoltage:number;
    mainNominalFrequency:number;
    mainNominalCurrent:number;
    mainLoopImpedance:string;
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
    

    supplyParameters: SupplyParameters[];
    circuitBreaker: CircuitBreaker[];
    instalLocationReport: InstallLocationReport[];
    boundingLocationReport: BoundingLocationReport[];
    earthingLocationReport: EarthingLocationReport[];

}
export class SupplyParameters {
  aLSystemEarthing:string;
  aLSupplyNo:string;
  aLSupplyShortName:string;
  aLSystemEarthingBNote:string;
  aLLiveConductorType:string;
  aLLiveConductorAC:string;
  aLLiveConductorDC:string;
  aLLiveConductorBNote:string;
  nominalVoltage:number;
  nominalFrequency:string;
  faultCurrent:string;
  loopImpedance:string;
  installedCapacity:string;
  actualLoad:string;
  ratedCurrent:string;
  currentDissconnection:string;
}

export class CircuitBreaker{
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
export class InstallLocationReport{
  locationNo:string;
  locationName:string;
  electrodeResistanceEarth:string;
  electrodeResistanceGird:string;
}

export class BoundingLocationReport{
  location:string;
  jointNo:string;
  jointResistance:string;
}

export class EarthingLocationReport{
  location:string;
  jointNo:string;
  jointResistance:string;
}

