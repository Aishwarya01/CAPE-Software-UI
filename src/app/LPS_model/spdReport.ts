export class spdReport {
    spdReportId!: number;
    basicLpsId!: number;
    userName!: String;
    createdBy!: String;
    createdDate!: Date;   
    spd!: spd[];     
}

export class spd {
    spdId!: number;
    buildingNumber!: number;
    buildingName!: String;
    buildingCount!: number;
    flag!: String;
    mainsIncomingOb!: String;
    mainsIncomingRem!: String;
    totalMainsIncomingOb!: String;
    totalMainsIncomingRem!: String;
    noPannelSupplittingOb!: String;
    noPannelSupplittingRem!: String;
    totalNoOutDoorRequipmentOb!: String;
    totalNoOutDoorRequipmentRem!: String;  

    spdDescription!: spdDescription[];
}

export class spdDescription {

    location!: String;
    panelName!: String;
    flag!: String;
    spdMakeOb!: String;
    spdMakeRem!: String;
    spdModelOb!: String;
    spdModelRem!: String;
    spdClassTypeOb!: String;
    spdClassTypeRem!: String;
    spdApplicationOb!: String;
    spdApplicationRem!: String;
    spdMainApplicationOb!: String;
    spdMainApplicationRem!: String;
    properConnectionOb!: String;
    properConnectionRem!: String;
    incomerRatingOb!: number;
    incomerRatingRem!: String;
    fuseBackUpOb!: number;
    fuseBackUpRem!: String;
    lengthOfConnectingWirePhaseOb!: number;
    lengthOfConnectingWirePhaseRem!: String;
    lengthOfConnectingWireProtectiveOb!: number;
    lengthOfConnectingWireProtectiveRem!: String;
    sizeOfConnectingWirePhaseOb!: number;
    sizeOfConnectingWirePhaseRem!: String;
    sizeOfConnectingWireProtectiveOb!: number;
    sizeOfConnectingWireProtectiveRem!: String;
    spdDescriptionId!: number;
}