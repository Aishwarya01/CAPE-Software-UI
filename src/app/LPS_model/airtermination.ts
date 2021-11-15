export class Airtermination {
    basicLpsId!: number;
    userName!: string;
    connectionMadeBraOb!: string;
    connectionMadeBraRe!: string;
    electricalEquipPlacedOb!: string;
    electricalEquipPlacedRe!: string;
    combustablePartOb!: string;
    combustablePartRe!: string;
    terminationMeshConductorOb!: string;
    terminationMeshConductorRe!: string;
    bondingEquipotentialOb!: string;
    bondingEquipotentialRe!: string;
    createdBy!: String;
    createdDate!: Date;
    airClamps!:AirClamps[];
    airConnectors!:AirConnectors[];
    lpsVerticalAirTermination!:LpsVerticalAirTermination[];
    airMeshDescription!:AirMeshDescription[];
    airExpansion!:AirExpansion[];
    airHolderDescription!:AirHolderDescription[];
    

}
export class AirClamps {
    physicalInspectionOb!: string;
    physicalInspectionRe!: string;
    conductorClampsFlatSurafaceOb!: string;
    conductorClampsFlatSurafaceRe!: string;
    interConnectionOfClampsOb!: string;
    interConnectionOfClampsRe!: string;
    clampTypeOb!: string;
    clampTypRe!: string;
    materialOfClampsOb!: string;
    materialOfClampsRe!: string;
    totalClampsNoOb!: string;
    totalClampsNoRe!: string;
    inspectionNoOb!: string;
    inspectionNoRe!: string;
    inspectionPassedOb!: string;
    inspectionPassedRe!: string;
    inspectionFailedReOb!: string;
    inspectionFailedReRe!: string;
}

export class AirConnectors {
    physicalInspectionOb!: string;
    physicalInspectionRe!: string;
    checkConnectionConnectorsOb!: string;
    checkConnectionConnectorsRe!: string;
    materialOfConnectorOb!: string;
    materialOfConnectorRe!: string;
    strightConnectorOb!: string;
    strightConnectorRe!: string;
    tConnectorOb!: string;
    tConnectorRe!: string;
    lConnectorOb!: string;
    lConnectorRe!: string;
    totalNoConnectorOb!: string;
    totalNoConnectorRe!: string;
    inspectionNoOb!: string;
    inspectionNoRe!: string;
    inspectionPassedNoOb!: string;
    inspectionPassedNoRe!: string;
    inspectionFailedOb!: string;
    inspectionFailedRe!: string
}

export class LpsVerticalAirTermination {
    sizeOfTerminalOb!: string;
    sizeOfTerminalRe!: string;
    heightOfTerminalOb!: string;
    heightOfTerminalRe!: string;
    angleProtectionHeightOb!: string;
    angleProtectionHeightRe!: string;
    materialOfTerminalOb!: string;
    materialOfTerminalRe!: string;
    physicalInspectionOb!: string;
    physicalInspectionRe!: string;
    supportFlatSurfaceOb!: string;
    supportFlatSurfaceRe!: string;
    heightFlatSurfaceOb!: string;
    heightFlatSurfaceRe!: string;
    vatToRoofConductorOB!: string;
    vatToRoofConductorRe!: string;
    totalNumberOb!: string;
    totalNumberRe!: string;
    inspNoOb!: string;
    inspNoRe!: string;
    inspPassedNoOb!: string;
    inspPassedNoRe!: string;
    inspFaileddNoOb!: string;
    inspFaileddNoRe!: string
}
export class AirMeshDescription {
    sizeOfConductorOb!: string;
    sizeOfConductorRe!: string;
    meshSizeOb!: string;
    meshSizeRe!: string;
    maximumDistanceOb!: string;
    maximumDistanceRe!: string;
    minimumDistanceOb!: string;
    minimumDistanceRe!: string;
    heightOfConductorFlatSurfaceOb!: string;
    heightOfConductorFlatSurfaceRe!: string
}
export class AirExpansion {
    physicalInspectionOb!: string;
    physicalInspectionRe!: string;
    strightConnectorPiecOb!: string;
    strightConnectorPiecRe!: string;
    materialOfExpansionOb!: string;
    materialOfExpansionRe!: string;
    totalNoExpansionOb!: string;
    totalNoExpansionRe!: string;
    inspectionNoOb!: string;
    inspectionNoRe!: string;
    inspectionPassedNoOb!: string;
    inspectionPassedNoRe!: string;
    inspectionFailedNoOb!: string;
    inspectionFailedNoRe!: string
}
export class AirHolderDescription {
    physicalInspectionOb!: string;
    physicalInspectionRe!: string;
    conductorHolderFlatSurfaceOb!: string;
    conductorHolderFlatSurfaceRe!: string;
    conductorHolderOb!: string;
    conductorHolderRe!: string;
    holderTypeOb!: string;
    holderTypeRe!: string;
    materialHolderOb!: string;
    materialHolderRe!: string;
    totalHolderNoOb!: string;
    totalHolderNoRe!: string;
    totalParpetHolderNoOb!: string;
    totalParpetHolderNoRe!: string;
    holderInspNoOb!: string;
    holderInspNoRe!: string;
    holderInspPassedOb!: string;
    holderInspPassedNoRe!: string;
    holderInspFailedNoOb!: string;
    parpetInspectionNoOb!: string;
    parpetInspectionNoRe!: string;
    holderInspPassedNoOb!: string;
    parpetInspectionPassedNoOb!: string;
    parpetInspectionPassedNoRe!: string;
    parpetInspectionFailedNoOb!: string;
    parpetInspectionFailedNoRe!: string;
    holderInspFailedNoRe!: string
}