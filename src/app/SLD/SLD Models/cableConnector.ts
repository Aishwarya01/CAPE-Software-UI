export class CableConnector {
    cableId!: number;
    cableConnectorId!: String;
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

    generalTestingCableConnector!: GeneralTestingCableConnector[];
}

export class GeneralTestingCableConnector {
    generalTestingCableConnectorId!: number;
    phN!: String;
    // phE!: String;
    // nE!: String;
}
