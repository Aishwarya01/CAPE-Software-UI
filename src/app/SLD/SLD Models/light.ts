export class Light {
    nodeId!: String;
    fileName!: String;
    referenceName!: String;
    manufacturerName!: String;
    userName!: String;
    powerCapacity!: String;
    rating!: number;
    voltage!: number;
    type!: number;
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

    generalTestingRCBO!: GeneralTestingRCBO[];
    safetyTestingRCBO!: SafetyTestingRCBO[];
}

export class GeneralTestingRCBO {
    phN!: String;
    phE!: String;
    nE!: String;
    iRCurrent!: String;
    iNCurrent!: String;
    iPECurrent!: String;

    powerFactor!: String;
    frequency!: String;    
}

export class SafetyTestingRCBO {
    phN!: String;
    phE!: String;
    nE!: String;
    
    shockVoltage!: String;
    floorResistance!: String;
    wallResistance!: String;    
}
