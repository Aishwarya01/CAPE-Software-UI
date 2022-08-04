export class Fan {
    fanId!: number;
    nodeId!: String;
    fileName!: String;
    referenceName!: String;
    manufacturerName!: String;
    userName!: String;
    powerCapacity!: String;
    currentRating!: number;
    voltage!: number;
    model!: number;
    incomingSizePhase!: number;
    incomingSizeNeutral!: number;
    incomingSizeProtective!: number;
    incomingLengthPhase!: number;
    incomingLengthNeutral!: number;
    incomingLengthProtective!: number;
    updatedBy!: String;
    createdDate!: Date;
    createdBy!: String;
    updatedDate!: Date;

    generalTestingFan!: GeneralTestingFan[];
    safetyTestingFan!: SafetyTestingFan[];
}

export class GeneralTestingFan {
    phN!: String;
    phE!: String;
    nE!: String;
    iRCurrent!: String;
    iNCurrent!: String;
    iPECurrent!: String;

    powerFactor!: String;
    frequency!: String;    
}

export class SafetyTestingFan {
    phN!: String;
    phE!: String;
    nE!: String;
    shockVoltage!: String;
    floorResistance!: String;
    wallResistance!: String;    
}
