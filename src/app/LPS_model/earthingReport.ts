export class earthingReport{
    earthingReportId!: number;
    userName!: String;
    basicLpsId!: number;
    createdBy!: String;
    createdDate!: Date;
    updatedBy!: String;
    updatedDate!: Date;
    earthingLpsDescription!:earthingLpsDescription[];
}


export class earthingLpsDescription {
    earthingId!: number;
    earthingTypeInOb!: String;
    earthingTypeInRem!: String;
    bimetallicIssueInOb!: String;
    bimetallicIssueInRem!: String;
    brazingConnectInOb!: String;
    brazingConnectInRem!: String;
    buildingNumber!: number;
    buildingName!: String;
    buildingCount!: number;
    flag!: String;       
    earthingDescriptionAvailabilityOb!: String; 
    earthingDescriptionAvailabilityRem!: String; 
    earthingClampsAvailabilityOb!: String; 
    earthingClampsAvailabilityRem!: String; 
    earthingElectrodeChamberAvailabilityOb!: String; 
    earthingElectrodeChamberAvailabilityRem!: String; 
    earthingSystemAvailabilityOb!: String; 
    earthingSystemAvailabilityRem!: String; 
    earthingElectrodeTestingAvailabilityOb!: String; 
    earthingElectrodeTestingAvailabilityRem!: String;
    earthingDescription!: EarthingDescription[];
    earthingClamps!: EarthingClamps[];
    earthingElectrodeChamber!: EarthingElectrodeChamber[];
    earthingSystem!: EarthingSystem[];    
    earthElectrodeTesting!: EarthElectrodeTesting[];    

}
export class EarthingDescription {
    earthDescriptionId!:number
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
    earthingDescriptionList!:earthingDescriptionList[];
}

 
export class earthingDescriptionList {
   earthDescriptionListId!:number
   flag!: String;
   earthingConductorMaterialInOb!: String;
   earthingConductorMaterialInRem!: String;
   earthElectrodeMaterialInOb!: String;
   earthElectrodeMaterialInRem!: String;
   earthElectrodeTypeInOb!: String;
   earthElectrodeTypeInRem!: String;
   earthElectrodeSizeInOb!: String;
   earthElectrodeSizeInRem!: String;
   earthElectrodeLengthingOb!:number
   earthElectrodeLengthingRem!: String;
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
    earthingElectrodeChamberId!: number;
    flag!: String;
    physicalInspeOb!: String;
    physicalInspeRem!: String;
    chamberTypeOb!: String;
    chamberTypeRem!: String;
    chamberSizeOb!: String;
    chamberSizeRem!: String;
    maximumWithStandLoadOb!: String;
    maximumWithStandLoadRem!: String;
    chamberLocationOb!: String;
    chamberLocationRem!: String;
    maximumPlacedSoilOb!: String;
    maximumPlacedSoilRem!: String;
    totalChamberNoOb!: number;
    totalChamberNoRem!: String;
    inspectedChamberInOb!: number;
    inspectedChamberInRem!: String;
    inspectionPassedInOb!: number;
    inspectionPassedInRem!: String;
    inspectionFailedInOb!: number;
    inspectionFailedInRem!: String;                 
}


export class EarthingSystem {
   
    earthingSystemId!: number;
    flag!: String;
    eastOb!: number;
    eastRem!: String;
    westOb!: number;
    westRem!: String;
    northOb!: number;
    northRem!: String;
    southOb!: number;
    southRem!: String;
    ringWallEarthEastOb!: number;
    ringWallEarthEastRem!: String;
    ringWallEarthWestOb!: number;
    ringWallEarthWestRem!: String;
    ringWallEarthNorthOb!: number;
    ringWallEarthNorthRem!: String;
    ringWallEarthSouthOb!: number;
    ringWallEarthSouthRem!: String;
    connectedEarthElectrodeOb!: String;
    connectedEarthElectrodeRem!: String;
    jointsMadeBrazingOb!: String;
    jointsMadeBrazingRem!: String;
    materialOfEartElectrodeOb!: String;
    materialOfEartElectrodeRem!: String;
    typeOfEarthElectrodeOb!: String;
    typeOfEarthElectrodeRem!: String;
    sizeOfEarthElectrodeOb!: String;
    sizeOfEarthElectrodeRem!: String;
    maximumDistanceEartElectrodeWalOb!: number;
    maximumDistanceEartElectrodeWalRem!: String;
    manimumDistanceEartElectrodeWalOb!: number;
    manimumDistanceEartElectrodeWalRem!: String;                   
}

export class EarthElectrodeTesting{
    earthingElectrodeTestingId!: number;
    serialNo!: number;
    flag!: String;
    earthingElectrodeType!: String;
    earthingElectrodeMaterial!: String;
    earthingElectrodeSize!: number;
    earthingElectrodeDepth!: number;
    earthingElectrodeResistance!: number;
    earthingElectrodeRemarks!: String;                  
}