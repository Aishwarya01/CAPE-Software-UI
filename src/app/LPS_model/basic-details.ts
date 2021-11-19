export class BasicDetails {
    basicLpsId : number;
    clientName : String;
    userName : String;
    projectName : String;
    pmcName : String;
    consultantName : String;
    contractorName : String;
    dealerContractorName : String;
    address : String;
    location : String;
    installationContractor : String;
    industryType : String;
    buildingType : String;
    buildingLength : String;
    buildingWidth : String;
    buildingHeight : String;
    levelOfProtection : String;
    soilResistivity : String;
    createdDate: Date;
    createdBy: String;
    basicLpsDescription:BasicLpsDescription[];
}

export class BasicLpsDescription 
    {
     basicLpsDescriptionId: number;
     approvedDrawingObserv :  String;
     approvedDrawingRemarks :  String;
     architectNameObserv : String;
     architectNameRemarks :  String;
     designDateObserv : String;
     designDateRemarks : String;
     approvedByObserv :  String;
     approvedByRemarks : String;
     dateOfApprovalOb : String;
     dateOfApprovalRem : String;

     drawingObserv :  String;
     drawingRemarks : String;
     revisionNoObserv : String;
     revisionNoRemarks : String;
     deviationObserv :  String;
     deviationRemarks : String;
     installationQualityObserv :  String;
     installationQualityRemarks :  String 
    }