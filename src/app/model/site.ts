export class Site {
  clientName: String;
  companyName: String;
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
  assignedTo: String;
  sitePersons: SitePersons[];
}

export class SitePersons {
    personIncharge: String;
    designation: String;
    contactNo: String;
    personInchargeEmail: String;
    inActive: Boolean = true;
    personId: number;
    countryCode: String;
}
