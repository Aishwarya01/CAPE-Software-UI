export class Summary {
    userName!: String;
    siteId!: number;
    summaryId!: number;
    limitationsInspection!: String;
    extentInstallation!: String;
    agreedLimitations!: number;
    agreedWith!: number;
    operationalLimitations!: String;
    inspectionTestingDetailed!: String;
    recommendationsDate!: number;
    generalConditionInstallation!: String;
    overallAssessmentInstallation!: String;
    createdBy!: String;
    createdDate!: Date;
    updatedBy!: String;
    updatedDate!: Date;
    

    summaryObervation!: summaryObervation[];
    summaryDeclaration!: summaryDeclaration[];

}

export class summaryObervation {
    observations!: String;
    referanceNumberReport!: String;
    furtherActions!: number;
    obervationStatus!: String;
    comment!: String;
}
export class  summaryDeclaration{
        declarationRole!: String;
        signature!: String;
        company!: String;
        position!: String;
        address!: String;
        date!: number;
}
