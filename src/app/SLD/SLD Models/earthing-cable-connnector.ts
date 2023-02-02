export class EarthingCableConnnector {
    earthconnectorid!: number;
    earthCableConnectorid!: String;
    typeOfElectrode: String='';
    materialElectrode: String='';
    sizeElectrode!: String;
    depthElectrode!: number;
    fileName!: String;

    // Table Data
    earthElectrodeResistance!: number;
    combinedResistance!: number;

    createdDate!: Date;
    createdBy!: String;
    updatedDate!: Date;
    updatedBy!: String;

}
