export class EarthingLpsDescription{
    earthingId!: number;
    userName!: String;
    basicLpsId!: number;
    earthingTypeInOb!: String;
    earthingTypeInRem!: String;
    bimetallicIssueInOb!: String;
    bimetallicIssueInRem!: String;
    brazingConnectInOb!: String;
    brazingConnectInRem!: String;
    createdBy!: String;
    createdDate!: Date;
    earthingDescription!: EarthingDescription[];
    earthingClamps!: EarthingClamps[];
    earthingElectrodeChamber!: EarthingElectrodeChamber[];
    earthingSystem!: EarthingSystem[];
}

export class EarthingDescription {
    flag!:boolean;
    locationNumber!:number;
    locationName!:String;
    soilResistivityInOb!: String;
    soilResistivityInRem!: String;
    earthPitDigOb!: String;
    earthPitDigRem!: String;
    earthElectrodeLesthanDownConductorInOb!: String;
    earthElectrodeLesthanDownConductorInRem!: String;
    connectedEarthTerminalInOb!: String;
    connectedEarthTerminalInRem!: String;
    testJointEarthElectrodeInOb!: String;
    testJointEarthElectrodeInRem!: String;
    grountLevelComponentFilledInOb!: String;
    grountLevelComponentFilledInRem!: String;
    earthElectrodeLocationInOb!: String;
    earthElectrodeLocationInRem!: String;
    earthElectrodeMaterialInOb!: String;
    earthElectrodeMaterialInRem!: String;
    earthElectrodeSizeInOb!: String;
    earthElectrodeSizeInRem!: String;
    earthElectrodeLengthingOb!: String;
    earthElectrodeLengthingRem!: String;
    earthelectMaxiDistWallInOb!: String;
    earthelectMaxiDistWallInRem!: String;
    earthelectManimumDistanceWallInOb!: String;
    earthelectManimumDistanceWallInRem!: String;
    earthelectMaxiDistOb!: String;
    earthelectMaxiDistRem!: String;
    earthelectManiDistOb!: String;
    earthelectManiDistRem!: String;
    totalNumberOfElectrodeOb!: String;
    totalNumberOfElectrodeRem!: String;
    inspectedNoOb!: String;
    inspectedNoRem!: String;
    inspectedPassedNoOb!: String;
    inspectedPassedNoRem!: String;
    inspectedFailedNoOb!: String;
    inspectedFailedNoRem!: String;
}
 

export class EarthingClamps {
    flag!:boolean;
    locationNumber!:number;
    locationName!:String;
    physicalInspectionInOb!: String;
    psysicalInspectionInRem!: String;
    clampsFirmlyOb!: String;
    clampsFirmlyRem!: String;
    interConnectOfEarthClampInOb!: String;
    interConnectOfEarthClampInRem!: String;
    typeOfClampsInOb!: String;
    typeOfClampsInRem!: String;
    materialOfClampsInOb!: String;
    materialOfClampsInRem!: String;
    totalNoClampsInOb!: String;
    totalNoClampsInRem!: String;
    inspectedClampsInOb!: String;
    inspectedClampsInRem!: String;
    inspectionPassedInOb!: String;
    inspectionPassedInRem!: String;
    inspectionFailedInOb!: String;
    inspectionFailedInRem!: String;
}

export class EarthingElectrodeChamber {
    flag!:boolean;
    locationNumber!:number;
    locationName!:String;
    physicalInspeOb!: String;
    physicalInspeRem!: String;
    chamberTypeOb!: String;
    chamberTypeRem!: String;
    chamberSizeOb!: String;
    chamberSizeRem!: String;
    maximumWithStandLoadOb!: String;
    maximumWithStandLoadRem!: String;
    maximumPlacedSoilOb!: String;
    maximumPlacedSoilRem!: String;
    totalChamberNoOb!: String;
    totalChamberNoRem!: String;
    inspectedChamberInOb!: String;
    inspectedChamberInRem!: String;
    inspectionPassedInOb!: String;
    inspectionPassedInRem!: String;
    inspectionFailedInOb!: String;
    inspectionFailedInRem!: String;
}


export class EarthingSystem {
   
    buriedElectrodeOb!: String;
    buriedElectrodeRem!: String;
    depthOfElectrodeOb!: String;
    depthOfElectrodeRem!: String;
    earthOb!: String;
    earthRem!: String;
    westOb!: String;
    westRem!: String;
    northOb!: String;
    northRem!: String;
    southOb!: String;
    southRem!: String;
    ringEarthWallDistanceOb!: String;
    ringEarthWallDistanceRem!: String;
    ringWallEarthEastOb!: String;
    ringWallEarthEastRem!: String;
    ringWallEarthWestOb!: String;
    ringWallEarthWestRem!: String;
    ringWallEarthNorthOb!: String;
    ringWallEarthNorthRem!: String;
    ringWallEarthSouthOb!: String;
    ringWallEarthSouthRem!: String;
    jointsMadeBrazingOb!: String;
    jointsMadeBrazingRem!: String;
    materialOfEartElectrodeOb!: String;
    materialOfEartElectrodeRem!: String;
    sizeOfEarthElectrodeOb!: String;
    sizeOfEarthElectrodeRem!: String;
  
    maximumDistanceEartElectrodeWalOb!: String;
    maximumDistanceEartElectrodeWalRem!: String;
    manimumDistanceEartElectrodeWalOb!: String;
    manimumDistanceEartElectrodeWalRem!: String;
}

