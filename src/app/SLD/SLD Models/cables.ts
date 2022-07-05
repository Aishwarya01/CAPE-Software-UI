export class Cables {
    cableId!: number;
    nodeId!: String;
    fileName!: String;
    manufacturerName!: String;
    userName!: String;
    conductorType!: String;
    voltage!: number;
    busDuctType!: String;
    installation!: String;
    busDuctPhaseM!: String;
    busDuctNeutralM!: String;
    busDuctProtectiveM!: String;
    busDuctLength!: String;
    potentialTestReport!: String;
    updatedBy!: String;
    createdDate!: Date;
    createdBy!: String;
    updatedDate!: Date;

    generalTestingCables!: GeneralTestingCables[];
}

export class GeneralTestingCables {
    phN!: String;
    // phE!: String;
    // nE!: String;
}
