export class Airtermination {
    basicLpsId!: number;
    lpsAirDescId!: number;
    userName!: string;
    // connectionMadeBraOb!: string;
    // connectionMadeBraRe!: string;
    // electricalEquipPlacedOb!: string;
    // electricalEquipPlacedRe!: string;
    // combustablePartOb!: string;
    // combustablePartRe!: string;
    // terminationMeshConductorOb!: string;
    // terminationMeshConductorRe!: string;
    // bondingEquipotentialOb!: string;
    // bondingEquipotentialRe!: string;
    airTerminationId!: Number;
    createdBy!: String;
    createdDate!: Date;
    lpsAirDescription!: lpsAirDescription[]
}

export class lpsAirDescription {
    // lpsVerticalAirTerminationId!: Number;
    lpsAirDescId!: number;
    buildingCount!: number
    buildingNumber!: number;
    buildingName!: String;
    buildingType!: String;
    buildingLength!: number;
    buildingHeight!: number;
    buildingWidth!: number;
    protectionLevel!: String;
    flag!: String;
    airClamps!:airClamps[];
    airConnectors!:AirConnectors[];
    lpsVerticalAirTermination!:LpsVerticalAirTermination[];
    airMeshDescription!:AirMeshDescription[];
    airExpansion!:AirExpansion[];
    airHolderDescription!:AirHolderDescription[];
    airBasicDescription!: airBasicDescription[];
}

export class airBasicDescription {
      approvedDrawingObserv!: String;
      approvedDrawingRemarks!: String;
      architectNameObserv!: String;
      architectNameRemarks!: String;
      designDateObserv!: String;
      designDateRemarks!: String;
      approvedByObserv!: String;
      approvedByRemarks!: String;
      dateOfApprovalOb!: String;
      dateOfApprovalRem!: String;
      drawingObserv!: String;
      drawingRemarks!: String;
      revisionNoObserv!: String;
      revisionNoRemarks!: String;
      deviationObserv!: String;
      deviationRemarks!: String;
      installationQualityObserv!: String;
      installationQualityRemarks!: String;

      connectionMadeBraOb!: String;
      connectionMadeBraRe!: String;
      electricalEquipPlacedOb!: String;
      electricalEquipPlacedRe!: String;
      combustablePartOb!: String;
      combustablePartRe!: String;
      terminationMeshConductorOb!: String;
      terminationMeshConductorRe!: String;
      bondingEquipotentialOb!: String;
      bondingEquipotentialRe!: String;
}

export class airClamps {
    // flag:boolean=true;
    clampsId!: Number;
    // locationNumber!:number;
    // locationName!:String;
    physicalInspectionOb!: string;
    physicalInspectionRe!: string;
    installationTerminationsystemOb!: string;
    installationTerminationsystemRem!: string;
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
    // flag:boolean=true;
    // locationNumber!:number;
    // locationName!:String;
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
    // flag:boolean=true;
    // locationNumber!:number;
    // locationName!:String;
    lpsVerticalAirTerminationId!: number;
    lpsAirDescId!: number;
    physicalInspectionOb!: string;
    physicalInspectionRe!: string;
    totalNumberOb!: string;
    totalNumberRe!: string;
    inspNoOb!: string;
    inspNoRe!: string;
    inspPassedNoOb!: string;
    inspPassedNoRe!: string;
    inspFaileddNoOb!: string;
    inspFaileddNoRe!: string;
    verticalAirTerminationList!: VerticalAirTerminationList[];

}

export class VerticalAirTerminationList {
    sizeOfTerminalOb!: string;
    sizeOfTerminalRe!: string;
    heightOfTerminalOb!: string;
    heightOfTerminalRe!: string;
    angleProtectionHeightOb!: string;
    angleProtectionHeightRe!: string;
    materialOfTerminalOb!: string;
    materialOfTerminalRe!: string;
    supportFlatSurfaceOb!: string;
    supportFlatSurfaceRe!: string;
    heightFlatSurfaceOb!: string;
    heightFlatSurfaceRe!: string;
}
export class AirMeshDescription {
    // flag:boolean=true;
    meshDescriptionId!: Number;
    // locationNumber!:number;
    // locationName!:String;
    physicalInspectionOb!: string;
    physicalInspectionRe!: string;
    materailOfConductorOb!: string;
    materailOfConductorRem!: string;
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
    // flag:boolean=true;
    // locationNumber!:number;
    // locationName!:String;
    expansionId!: Number;
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
    holderDescriptionId!: Number;
     lpsAirDescId!: number;
	 physicalInspectionOb!: string;
	 physicalInspectionRe!: string;
	 conductorHolderFlatSurfaceOb!: string;
	 conductorHolderFlatSurfaceRe!: string;
	 conductorHolderOb!: string;
	 conductorHolderRe!: string;
	 materailOfParpetHolderOb!: string;
	 materailOfParpetHolderRem!: string;
	 totalParpetHolderNoOb!: string;
	 totalParpetHolderNoRe!: string;
	 parpetInspectionNoOb!: string;
	 parpetInspectionNoRe!: string;
	 parpetInspectionPassedNoOb!: string;
	 parpetInspectionPassedNoRe!: string;
	 parpetInspectionFailedNoOb!: string;
	 parpetInspectionFailedNoRe!: string;    
     airHolderList!: AirHolderList[];

}

export class AirHolderList {
    holderTypeOb!: string;
    holderTypeRe!: string;
    materialHolderOb!: string;
    materialHolderRe!: string;
    totalHolderNoOb!: string;
    totalHolderNoRe!: string;
    holderInspNoOb!: string;
    holderInspNoRe!: string;
    holderInspPassedNoOb!: string;
    holderInspPassedNoRe!: string;
    holderInspFailedNoOb!: string;
    holderInspFailedNoRe!: string;

}