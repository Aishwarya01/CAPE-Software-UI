export class Site {
    clientName: String;
    clientId: number;
    departmentName: String;
    departmentId: number;
    site: String;
    siteId: number;
    siteCd: String;
    userName: String;
    
    city: String;
    addressLine_1: String;
    addressLine_2: String;
    landMark: String;
    country: String;
    state: String;
    zipCode: number;
    createdDate: Date;
    createdBy: String;
    updatedDate: Date;
    updatedBy: String;  
    personInfo: PersonInfo[];
}

export class PersonInfo {
    personIncharge: String;
    designation: String;
    phoneNumber: number;
    personInchargeEmail: String;
}
