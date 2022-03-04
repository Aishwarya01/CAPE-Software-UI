export class EmcFacilityData {

    userName!: String;
    emcId!: number;
    facilityDataId!:number;
    blType!: String;
    blOtherDescription!: String;
    bcType!: String;
    bcNoOfFloors!: String;
    bcRoomFloorLocation!: String;
    bcBuildingPrimaryUse!: String;
    bcOtherUses!: String;
    rlInteriorRoom!: String;
    rlExteriorRoom!: String;
    rlSolidExterior!: String;
    rlWindowedExterior!: String;
    rlWindsFace!: String;
    ruDedicated!: String;
    // ruNonDedicated!: String;
    ruOtherDesc!: String;
    rmHeightTrueFloor!: String;
    rmHeightFalseFloor!: String;
    rmWidth!: String;
    rmLength!: String;
    rmMaxFloor!: String;
    ftRaisedFloor!: String;
    ftAirSupply!: String;
    ftHeight!: String;
    ftAirFlowObservation!: String;
    ftDescription!: String;
    ftAirGrillDampers!: String;
    ftCableHole!: String;
    ftPedestals!: String;
    ftGrids!: String;
    ftBolted!: String;
    ftWelded!: String;
    ftEarthingDesc!: String;
    ftTrueFloorMaterial!: String;
    ftDescribe!: String;
    ftCleanliness!: String;
    ftOtherDescription!: String;
    createdDate!: Date;
    createdBy!: String;
    updatedBy!: String;
    updatedDate!: Date;

    floorCovering!: FloorCovering[];
}

export class FloorCovering {
   
    floorCoveringId!: number;
    fcType!: String;
    fcManufactor!: String;
    fcDescription!: String;
    fcWoven!: String;
    fcChemical!: String;
    fcNone!: String;
    fcOtherDecription!: String;
    wallType!: String;
    wallMaterial!: String;
    wallCoveringType!: String;
    wallHumidity!: String;
    wallSealing!: String;
    wallDesc!: String;
    ccFalseDesc!: String;
    ccFalseHumidity!: String;
    ccFalseHeight!: String;
    ccUtilisation!: String;
    ccTrueDesc!: String;
    ccTrueHumidity!: String;
    ccSurfaceDesc!: String;
    windowsExternal!: String;
    windowsDescription!: String;
    windowsCovering!: String;
    windowsOtherDesc!: String;
    windowsInternalDesc!: String;
    doorsMaterial!: String;
    doorsNumber!: String;
    doorsWidth!: String;
    doorsHeight!: String;
    doorsCloserMechanish!: String;
    doorsQualitySealing!: String;
    doorsDesc!: String;
}
