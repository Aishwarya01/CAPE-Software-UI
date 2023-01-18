export class Register {

    // lv
    name!: String;
    siteName!: String;
    registerId!: number;
    // lps
    clientName!: string;
    projectName!: string;
    lpsName!: string;
    // emc
    emcClientName!: string;
    personName!: string;

    companyName!: String;
    username!: String;
    password!: String;
    role!: String;  
    contactNumber!: String;
    applicationType!: String;
    department!: String;
    designation!: String;
    address!: String;
    district!: String;
    pinCode!: String;
    country!: String;
    state!: String;
    permission!: String;
    comment!: String;
    interestedAreas!: String;
    createdDate!: Date;
    createdBy!: String;
    updatedDate!: Date;
    updatedBy!: String;
    adminUserName!: String;
    otpSessionKey!: String;
    assignedBy!: String;
    noOfLicence!: number;
    userType!: String;
    siteId!: Number;
    personId!: Number;
    selectedProject!:string;
}

export class License{
    noOfLVLicence!: String;
    
    lvStatus!: String;
    noOfLPSLVLicence!: String;
 
    lpsStatus!: String;
    noOfEMCLVLicence!: String;
    emcClientName!: String;
    emcStatus!: String;
    noOfRISKLVLicence!: String;
    riskStatus!: String;
    organisationName!: String;
    projectName!: String;
    viewerRegister!: String;
    project!: String;
}
