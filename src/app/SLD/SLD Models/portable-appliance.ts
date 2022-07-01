export class PortableAppliance {
    portableApplianceId!: number;
    nodeId!: String;
    fileName!: String;
    userName!: String;
    referenceName!: String;
    portableApplianceName!: String;
    manufacturerName!: String;
    insulationClass!: String;
    rating!: number;
    voltage!: number;
    // outGoingSizePhase!: number;
    // outGoingSizeNeutral!: number;
    // outGoingSizeProtective!: number;
    updatedBy!: String;
    createdDate!: Date; 
    createdBy!: String;
    updatedDate!: Date;

    generalTestingPAT!: GeneralTestingPAT[];
}

export class GeneralTestingPAT {
    generalTestingPATId!: number;
    classType!: String;
    serialNo!: number;
    reference!: String;
    voltage!: String;
    continuityResistance!: String;  
    insulationResistance!: String;
    leakageCurrent!: String;
}