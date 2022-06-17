export class LTMotor {
    nodeId!: String;
    fileName!: String;
    userName!: String;
    referenceName!: String;
    manufacturerName!: String;
    windingConnection!: String;
    powerCapacity!: number;
    currentRating!: number;
    voltage!: number;
    noOfPhase!: string;
    type!: number;
    phase!: number;
    neutral!: number;
    protectiveConductor!: number;
    phaseLen!: number;
    neutralLen!: number;
    protectiveConductorLen!: number;
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

    generalTestingLTMotor!: GeneralTestingLTMotor[];
    safetyTestingLTMotor!: SafetyTestingLTMotor[];
}

export class GeneralTestingLTMotor {
    rE!: String;
    yE!: String;
    bE!: String;
    rY!: String;
    yB!: String;
    bR!: String;
    polarityR!: number;
    polarityY!: number;
    polarityB!: number;
    powerFactor!: String;
    frequency!: String;    
}

export class SafetyTestingLTMotor {
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

