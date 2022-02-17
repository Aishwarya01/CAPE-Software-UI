export class downConductorReport {
    downConductorReportId!: number;
    basicLpsId!: number;
    userName!: String;
    createdBy!: String;
    createdDate!: Date;
    updatedBy!: String;
    updatedDate!: String;
}

export class downConductorDescription {
    downConduDescId!: number;
    buildingName!: String;
    buildingNumber!: number;
    buildingCount!: number;
    flag!: String;
    biMetallicIssueOb!: String;
    biMetallicIssueRem!: String;
    warningNoticeGroundLevelOb!: String;
    warningNoticeGroundLevelRem!: String;
    insulationPresenceOb!: String;
    insulationPresenceRem!: String;
    noPowerDownConductorOb!: String;
    noPowerDownConductorRem!: String;
    connectMadeBrazingOb!: String;
    connectMadeBrazingRem!: String;
    chemicalSprinklerOb!:  String;
    chemicalSprinklerRem!: String;
    cobustMaterialWallOB!: String;
    cobustMaterialWallRem!: String;
    
    bridgingDescriptionAvailabilityOb!: String;
    bridgingDescriptionAvailabilityRem!: String;
    holderAvailabilityOb!: String;
    holderAvailabilityRem!: String;
    connectorsAvailabilityOb!: String;
    connectorsAvailabilityRem!: String;
    lightningCounterAvailabilityOb!: String;
    lightningCounterAvailabilityRem!: String;
    testingJointAvailabilityOb!: String;
    testingJointAvailabilityRem!: String;
    downConductorAvailabilityOb!: String;
    downConductorAvailabilityRem!: String;
    downConductorTestingAvailabilityOb!: String;
    downConductorTestingAvailabilityRem!: String

    downConductor!: downConductor[];
    bridgingDescription!: bridgingDescription[];
    holder!: holder[];
    connectors!: connectors[];
    lightningCounter!: lightningCounter[];
    testingJoint!: testingJoint[];
    downConductorTesting!: downConductorTesting[];
}

export class bridgingDescription {
    bridgingDescriptionId!: number;
    flag!: String;
    ensureBridgingCableOb!: String;
    ensureBridgingCableRem!:  String;
    aluminiumConductorSideWallOb!: String;
    aluminiumConductorSideWallRem!: String;
    bridgingCableConnectionOb!: String;
    bridgingCableConnectionRem!: String;
    bridgingCableMaterialOb!: String;
    bridgingCableMaterialRem!: String;
    bridgingCableSizeOb!: String;
    bridgingCableSizeRem!: String;
    totalNoBridgingCableOb!: number;
    totalNoBridgingCableRem!: String;
    inspectedNoOb!: number;
    inspectedNoRem!: String;
    inspectionPassedNoOb!: number;
    inspectionPassedNoRem!: String;
    inspectionFailedNoOb!: number;
    inspectionFailedNoRem!: String
}

export class holder {
    holderId!: number;
    flag!: String;
    physicalInspectionOb!: String;
    physicalInspectionRem!:  String;
    conductHolderFlatSurfaceOb!: String;
    conductHolderFlatSurfaceRem!:  String;
    conductorHoldedOb!: String;
    conductorHoldedRem!: String;
    successiveDistanceOb!: number;
    successiveDistanceRem!: String;
    materialHolderOb!: String;
    materialHolderRem!: String;
    totalNoHolderOb!: number;
    totalNoHolderRem!: String;
    inspectedNoOb!: number;
    inspectedNoRem!: String;
    inspectionPassedNoOb!: number;
    inspectionPassedNoRem!: String;
    inspectionFailedNoOb!: number;
    inspectionFailedNoRem!:  String
}

export class connectors {
    connectorId!: number;
    flag!: String;
    physicalInspectionOb!: String;
    physicalInspectionRem!: String;
    strightConnectCheckOb!: String;
    strightConnectCheckRem!:  String;
    materialConnectorOb!: String;
    materialConnectorRem!: String;
    maxConnectorsDownConductorOb!: number;
    maxConnectorsDownConductorRem!: String;
    totalNoConnectorsOb!: number;
    totalNoConnectorsRem!: String;
    inspectedNoOb!: number;
    inspectedNoRem!: String;
    inspectionPassedNoOb!: number;
    inspectionPassedNoRem!: String;
    inspectionFailedNoOb!: number;
    inspectionFailedNoRem!: String;
}


export class lightningCounter {
    lightingCountersId!: number;
    flag!: String;
    threadHoldCurrentOb!: number;
    threadHoldCurrentRem!:  String;
    maximumWithStandCurrentOb!: number;
    maximumWithStandCurrentRem!:  String;
    countsOb!: number;
    countsRem!: String;
    batteryLifeTimeOb!: number;
    batteryLifeTimeRem!: String;
    properConnectionLightingCounterOb!:  String;
    properConnectionLightingCounterRem!: String;
    lightingCounterPlacedOb!: String;
    lightingCounterPlacedRem!: String;
    conditionOfLightingCounterOb!: String;
    conditionOfLightingCounterRem!: String;
    totalNoLightingCounterOb!: number;
    totalNoLightingCounterRem!:  String;
    inspectedNoOb!: number;
    inspectedNoRem!: String;
    inspectionPassedNoOb!: number;
    inspectionPassedNoRem!: String;
    inspectionFailedNoOb!: number;
    inspectionFailedNoRem!:  String
}

export class testingJoint {
    testJointId!: number;
    flag!: String;
    testJointTypeOb!: String;
    testJointTypeRem!:  String;
    materialTestJointOb!: String;
    materialTestJointRem!:  String;
    accessibilityOfTestJointOb!: String;
    accessibilityOfTestJointRem!: String;
    nonMetalicProtectionOb!: String;
    nonMetalicProtectionRem!: String;
    testJointPlacedGroungLevelOb!:  String;
    testJointPlacedGroungLevelRem!: String;
    bimetallicIssueCheckOb!: String;
    bimetallicIssueCheckRem!: String;
    touchingConductorsOb!: String;
    touchingConductorsRem!: String;
    totalNoOfTestJointOB!: number;
    totalNoOfTestJointRem!: String;
    inspectedNoOb!: String;
    inspectedNoRem!:  String;
    inspectionPassedNoOb!: number;
    inspectionPassedNoRem!: String;
    inspectionFailedNoOb!: number;
    inspectionFailedNoRem!: String 
}

export class downConductor {
    downConductorId!: number;
    flag!: String;
    physicalInspectionOb!: String;
    physicalInspectionRem!:  String;
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
    installedShaftDownConductorOb!: String;
    installedShaftDownConductorRem!: String;
    ensureDownCnoductOb!:  String;
    ensureDownCnoductRem!:  String;
    installationDownConductOb!: String;
    installationDownConductRem!: String;
    maximumDownConductOb!: number;
    maximumDownConductRem!: String;
    manimumDownConductOb!: number;
    manimumDownConductRem!: String;
    totalNoDownConductOb!: number;
    totalNoDownConductRem!: String;
    inspectedNoOb!: number;
    inspectedNoRem!:  String;
    inspectionPassedNoOb!: number;
    inspectionPassedNoRem!: String;
    inspectionFailedNoOb!: number;
    inspectionFailedNoRem!: String;
    averageBendsOb!: number;
    averageBendsRem!: String;
    naturalDownCondutTypeOb!: String;
    naturalDownCondutTypeRem!: String;
    naturalDownCondDimensionOb!: String;
    naturalDownCondDimensionRem!: String
}

export class downConductorTesting {
    downConductorTestingId!: number;
    flag!: String;
    serialNo!: number;
    reference!: String;
    length!: number;
    resistance!: number;
    remarks!: String
}