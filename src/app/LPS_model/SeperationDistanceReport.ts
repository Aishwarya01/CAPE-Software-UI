export class SeperationDistanceReport {
    seperationDistanceReportId!: number;
    basicLpsId!: number;
    userName!: String;
    createdDate!: Date;
    createdBy!: String;

    seperationDistanceDescription!: SeperationDistanceDescription[];
}
export class SeperationDistanceDescription {

    seperationDistanceId!: number;
    buildingNumber!: number;
    buildingCount!: number;
    buildingName!: String
    flag!: String
    calculatedSeperationDistanceOb!: String
    calculatedSeperationDistanceRem!: String
    separateDistance!: SeparateDistance[]
    separateDistanceDownConductors!: SeparateDistanceDownConductors[]
}

export class SeparateDistance {
    seperationDistanceDescId!: number;
    flag!: String
    seperationDistanceDesc!: String
    seperationDistanceOb!: number;
    seperationDistanceRem!: String
}
export class SeparateDistanceDownConductors {
    seperationDistanceDownConductorId!: number;
    flag!: String
    seperationDistanceDesc!: String
    seperationDistanceOb!: number;
    seperationDistanceRem!: String
}