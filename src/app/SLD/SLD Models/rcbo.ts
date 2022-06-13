export class RCBO {
    rcboId!: number;
    nodeId!: String;
    fileName!: String;
    referenceName!: String;
    manufacturerName!: String;
    userName!: String;
    rating!: number;
    voltage!: number;
    noOfPoles!: number;
    currentCurve!: number;
    residualCurrentType!: String;
    residualCurrent!: String;
    outgoingSizePhase!: number;
    outgoingSizeNeutral!: number;
    outgoingSizeProtective!: number;
    updatedBy!: String;
    createdDate!: Date;
    createdBy!: String;
    updatedDate!: Date;

    generalTestingRCBO!: GeneralTestingRCBO[];
    safetyTestingRCBO!: SafetyTestingRCBO[];
}


export class GeneralTestingRCBO {
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

export class SafetyTestingRCBO {
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