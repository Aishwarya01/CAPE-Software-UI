export class Reportdetails {
    siteId: number;
    reportId: number;
    userName: String;
    descriptionReport: String;
    reasonOfReport: String;
    installationType: String;
    descriptionPremise: String;
    estimatedWireAge: String;
    evidanceAddition: String;
    evidanceWireAge: String;
    previousRecords: String;
    lastInspection: String;
    nextInspection: String;
    extentInstallation: String;
    clientDetails: String;
    installationDetails: String;
    verificationDate: String;
    verifiedEngineer: String;
    designation: String;
    company: String;
    limitations: String;
    createdBy: String;
    createdDate: Date;
    updatedBy: String;
    updatedDate: Date;

    signatorDetails: SignatorDetails [];
}

export class SignatorDetails {
    signatorRole: String;
    personName: String;
    personContactNo: String;
    personMailID: String;
    managerName: String;
    managerContactNo: String;
    managerMailID: String;
    companyName: String;
    addressLine1: String;
    addressLine2: String;
    landMark: String;
    state: String;
    pinCode: number;
    country: String;
    declarationSignature: String;
    declarationName: String;
    declarationDate: Date;
}

