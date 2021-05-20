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
    sitePersons: SitePersons[];
}

export class SitePersons {
    personIncharge: String;
    designation: String;
    contactNo: number;
    personInchargeEmail: String;
}
