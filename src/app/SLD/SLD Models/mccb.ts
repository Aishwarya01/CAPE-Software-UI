export class MCCB {
    nodeId!: String;
    fileName!: String;
    referenceName!: String;
    manufacturerName!: String;
    rating!: number;
    voltage!: number;
    relayManufacturer!: String;
    noOfPoles!: number;
    model!: number;
    overCurrent!: number;
    setTimes!: number;
    earthFault!: number;
    setTime!: number;
    outgoingSizePhase!: number;
    outgoingSizeNeutral!: number;
    outgoingSizeProtective!: number;
    updatedBy!: String;
    createdDate!: Date; 
    createdBy!: String;
    updatedDate!: Date;

    generalTestingMCCB!: GeneralTestingMCCB[];
    safetyTestingMCCB!: SafetyTestingMCCB[];
}

export class GeneralTestingMCCB {
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

export class SafetyTestingMCCB {
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

