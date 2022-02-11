export class Reportdetails {
    siteId!: number;
    reportId!: number;
    userName!: String;
    descriptionReport!: String;
    reasonOfReport!: String;
    installationType!: String;
    descriptionPremise!: String;
    estimatedWireAge!: String;
    evidanceAddition!: String;
    evidanceWireAge!: String;
    previousRecords!: String;
    lastInspection!: String;
    nextInspection!: String;
    extentInstallation!: String;
    clientDetails!: String;
    installationDetails!: String;
    verificationDate!: String;
    verifiedEngineer!: String;
    designation!: String;
    company!: String;
    inspectorDesignation!: String;
    inspectorCompanyName!: String;
    limitations!: String;
    createdBy!: String;
    createdDate!: Date;
    updatedBy!: String;
    updatedDate!: Date;
    viewerComments!: string;
    inspectorComments!: string;
   signatorDetails!: SignatorDetails[];
}

export class SignatorDetails {
    signatorId!: number;
    signatorRole!: String;
    personName!: String;
    personContactNo!: String;
    personMailID!: String;
    managerName!: String;
    managerContactNo!: String;
    managerMailID!: String;
    companyName!: String;
    addressLine1!: String;
    addressLine2!: String;
    landMark!: String;
    state!: String;
    pinCode!: number;
    country!: String;
    declarationSignature!: Blob;
    declarationName!: String;
    declarationDate!: Date;
    signatorStatus!: String;
}

