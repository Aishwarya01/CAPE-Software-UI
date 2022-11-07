export class Register {
    siteName!: String;
    registerId!: number;
    clientName!: String;
    projectName!: String;
    name!: String;
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
    
    license!:License[];
}

export class License{
    noOfLVLicence!: String;
    siteName!: String;
    lvStatus!: String;
    noOfLPSLVLicence!: String;
    lpsclientName!: String;
    lpsProjectName!: String;
    lpsStatus!: String;
    noOfEMCLVLicence!: String;
    emcClientName!: String;
    emcStatus!: String;
    noOfRISKLVLicence!: String;
    riskStatus!: String;
    organisationName!: String;
    projectName!: String;
    viewerRegister!: String;
}
