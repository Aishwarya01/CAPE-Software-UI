export class MCB {
    nodeId!: String;
    fileName!: String;
    referenceName!: String;
    manufacturerName!: String;;
    rating!: number;
    voltage!: number;
    noOfPoles!: number;
    currentCurve!: number;
    outgoingSizePhase!: number;
    outgoingSizeNeutral!: number;
    outgoingSizeProtective!: number;
    updatedBy!: String;
    createdDate!: Date;
    createdBy!: String;
    updatedDate!: Date;

    generalTestingMCB!: GeneralTestingMCB[];
    safetyTestingMCB!: SafetyTestingMCB[];

}

export class GeneralTestingMCB {
    rN!: String;
    yN!: String;
    bN!: String;
    rE!: String;
    yE!: String;
    bE!: String;
    rY!: String;
    yB!: String;
    bR!: String;
    nE!: String;
    powerFactor!: String;
    frequency!: String;    
}

export class SafetyTestingMCB {
    rN!: String;
    yN!: String;
    bN!: String;
    rE!: String;
    yE!: String;
    bE!: String;
    rY!: String;
    yB!: String;
    bR!: String;
    shockVoltage!: String;
    floorResistance!: String;
    wallResistance!: String;    
}
