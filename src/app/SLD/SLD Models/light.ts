export class Light {
    lightId!: number;
    nodeId!: String;
    fileName!: String;
    referenceName!: String;
    manufacturerName!: String;
    userName!: String;
    powerCapacity!: String;
    currentRating!: number;
    voltage!: number;
    model!: String;
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

    generalTestingLight!: GeneralTestingLight[];
    safetyTestingLight!: SafetyTestingLight[];
}

export class GeneralTestingLight {
    phN!: String;
    phE!: String;
    nE!: String;
    iRCurrent!: String;
    iNCurrent!: String;
    iPECurrent!: String;

    powerFactor!: String;
    frequency!: String;    
}

export class SafetyTestingLight {
    phN!: String;
    phE!: String;
    nE!: String;
    
    shockVoltage!: String;
    floorResistance!: String;
    wallResistance!: String;    
}
