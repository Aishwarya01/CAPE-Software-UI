export class MCCB {
    mccbID!: number;
    nodeId!: String;
    fileName!: String;
    userName!: String;
    referenceName!: String;
    manufacturerName!: String;
    rating!: number;
    voltage!: number;
    relayManufacturer!: String;
    noOfPoles!: number;
    model!: number;
    overcurrent!: number;
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
    // iRCurrent!: number;
    // iYCurrent!: number;
    // iBCurrent!: number;
    // iNCurrent!: number;
    // iPECurrent!: number;
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

