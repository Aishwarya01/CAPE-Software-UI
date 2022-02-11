export class Separatedistance {
    seperationDistanceId!: number;
    basicLpsId!: number;
    userName!: String;
    createdDate!: Date;
    createdBy!: String;

    separateDistanceDescription!: SeparateDistanceDescription[];
}
export class SeparateDistanceDescription {
    flag!:boolean;
    seperationDistanceDesc!: String;
    seperationDistanceOb!: String;
    seperationDistanceRem!: String;
}
