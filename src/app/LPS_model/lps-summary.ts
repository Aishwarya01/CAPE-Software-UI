export class LpsSummary {
    summaryLpsId!: number;
    basicLpsId!: number;
    userName!: String;
    createdBy!: String;
    createdDate!: Date;
    updatedBy!: String;
    updatedDate!: Date;
    summaryDate!: Date;
    inspectedYear!: Date;
    flag!: String;
    summaryLpsBuildings!: SummaryLpsBuildings[];
    summaryLpsDeclaration!: SummaryLpsDeclaration[];     
}

export class SummaryLpsBuildings {
    summaryLpsBuildingsId!: number;
    buildingNumber!: number;
    buildingName!: String;
    buildingCount!: number;
    flag!: String;
    summaryLpsObservation!: SummaryLpsObservation[];
}

export class SummaryLpsDeclaration {
    summaryLpsDeclarationId!: number;
    declarationRole!: String;
    name!: String;
    signature!: number;
    company!: String;
    position!: String;
    address!: String;
    date!: Date;
    summaryLpsObservation!: SummaryLpsObservation[];
}

export class SummaryLpsObservation {
    summaryLpsObservationId!: number;
    serialNo!: number;
    observation!: String;
    recommendation!: number;
    observationComponentDetails!: String;
    serialNoUi!: String;     
    headingUi!: String;
    heading!: String;
    summaryLpsInnerObservation!: SummaryLpsInnerObservation[];
}

export class SummaryLpsInnerObservation {
    summaryLpsInnerObservationId!: number;
    serialNo!: number;
    observation!: String;
    recommendation!: number;
    observationComponentDetails!: String;
}
