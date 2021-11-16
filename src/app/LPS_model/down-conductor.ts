export class DownConductorDescription {
    basicLpsId!: number;
    downConduDescId!: number;
    userName!: String;
    biMetallicIssueOb!: String;
    biMetallicIssueRem!: String;
    warningNoticeGroundLevelOb!: String;
    warningNoticeGroundLevelRem!: String;
    noPowerDownConductorOb!: String;
    noPowerDownConductorRem!: String;
    connectMadeBrazingOb!: String;
    connectMadeBrazingRem!: String;
    chemicalSprinklerOb!: String;
    chemicalSprinklerRem!: String;
    cobustMaterialWallOB!: String;
    cobustMaterialWallRem!: String;
    createdBy!: String;
    createdDate!: Date;
    downConductor!: DownConductor[];
    bridgingDescription!: BridgingDescription[];
    holder!: Holder[];
    connectors!: Connectors[];
    lightningCounter!: LightningCounter[];
    testingJoint!: TestingJoint[];
}

export class DownConductor {
    locationNumber!:number;
    lacationName!:String;
    physicalInspectionOb!: String;
    physicalInspectionRem!: String;
    conductMaterialOb!: String;
    conductMaterialRem!: String;
    conductSizeOb!: String;
    conductSizeRem!: String;
    downConductExposedOb!: String;
    downConductExposedRem!: String;
    downConductLocationdOb!: String;
    downConductLocationdRem!: String;
    downConductGutterOb!: String;
    downConductGutterRem!: String;
    ensureDownCnoductOb!: String;
    ensureDownCnoductRem!: String;
    installationDownConductOb!: String;
    installationDownConductRem!: String;
    maximumDownConductOb!: String;
    maximumDownConductRem!: String;
    manimumDownConductOb!: String;
    manimumDownConductRem!: String;
    totalNoDownConductOb!: String;
    totalNoDownConductRem!: String;
    inspectedNoOb!: String;
    inspectedNoRem!: String;
    inspectionPassedNoOb!: String;
    inspectionPassedNoRem!: String;
    inspectionFailedNoOb!: String;
    inspectionFailedNoRem!: String;
}

export class BridgingDescription {
    locationNumber!: number;
    lacationName!: String;
    ensureBridgingCableOb!: String;
    ensureBridgingCableRem!: String;
    aluminiumConductorSideWallOb!: String;
    aluminiumConductorSideWallRem!: String;
    bridgingCableConnectionOb!: String;
    bridgingCableConnectionRem!: String;
    totalNoBridgingCableOb!: String;
    totalNoBridgingCableRem!: String;
    inspectedNoOb!: String;
    inspectedNoRem!: String;
    inspectionPassedNoOb!: String;
    inspectionPassedNoRem!: String;
    inspectionFailedNoOb!: String;
    inspectionFailedNoRem!: String;
}

export class Holder {
    locationNumber!: number;
    lacationName!: String;
    physicalInspectionOb!: String;
    physicalInspectionRem!: String;
    conductHolderFlatSurfaceOb!: String;
    conductHolderFlatSurfaceRem!: String;
    conductorHoldedOb!: String;
    conductorHoldedRem!: String;
    materialHolderOb!: String;
    materialHolderRem!: String;
    totalNoHolderOb!: String;
    totalNoHolderRem!: String;
    inspectedNoOb!: String;
    inspectedNoRem!: String;
    inspectionPassedNoOb!: String;
    inspectionPassedNoRem!: String;
    inspectionFailedNoOb!: String;
    inspectionFailedNoRem!: String;
}

export class Connectors {
    locationNumber!: number;
    lacationName!: String;
    physicalInspectionOb!: String;
    physicalInspectionRem!: String;
    strightConnectCheckOb!: String;
    strightConnectCheckRem!: String;
    materialConnectorOb!: String;
    materialConnectorRem!: String;
    maxConnectorsDownConductorOb!: String;
    maxConnectorsDownConductorRem!: String;
    totalNoConnectorsOb!: String;
    totalNoConnectorsRem!: String;
    inspectedNoOb!: String;
    inspectedNoRem!: String;
    inspectionPassedNoOb!: String;
    inspectionPassedNoRem!: String;
    inspectionFailedNoOb!: String;
    inspectionFailedNoRem!: String;
}


export class LightningCounter {
    locationNumber!: number;
    lacationName!: String;
    threadHoldCurrentOb!: String;
    threadHoldCurrentRem!: String;
    maximumWithStandCurrentOb!: String;
    maximumWithStandCurrentRem!: String;
    countsOb!: String;
    countsRem!: String;
    batteryLifeTimeOb!: String;
    batteryLifeTimeRem!: String;
    properConnectionLightingCounterOb!: String;
    properConnectionLightingCounterRem!: String;
    lightingCounterPlacedOb!: String;
    lightingCounterPlacedRem!: String;
    conditionOfLightingCounterOb!: String;
    conditionOfLightingCounterRem!: String;
    totalNoLightingCounterOb!: String;
    totalNoLightingCounterRem!: String;
    inspectedNoOb!: String;
    inspectedNoRem!: String;
    inspectionPassedNoOb!: String;
    inspectionPassedNoRem!: String;
    inspectionFailedNoOb!: String;
    inspectionFailedNoRem!: String;
}

export class TestingJoint {
    locationNumber!: number;
    lacationName!: String;
    testJointTypeOb!: String;
    testJointTypeRem!: String;
    materialTestJointOb!: String;
    materialTestJointRem!: String;
    accessibilityOfTestJointOb!: String;
    accessibilityOfTestJointRem!: String;
    nonMetalicProtectionOb!: String;
    nonMetalicProtectionRem!: String;
    testJointPlacedGroungLevelOb!: String;
    testJointPlacedGroungLevelRem!: String;
    bimetallicIssueCheckOb!: String;
    bimetallicIssueCheckRem!: String;
    totalNoOfTestJointOB!: String;
    totalNoOfTestJointRem!: String;
    inspectedNoOb!: String;
    inspectedNoRem!: String;
    inspectionPassedNoOb!: String;
    inspectionPassedNoRem!: String;
    inspectionFailedNoOb!: String;
    inspectionFailedNoRem!: String;
}

