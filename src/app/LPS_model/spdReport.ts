export class spdReport {

    basicLpsId!: number;
    userName!: String;
    mainsIncomingOb!: String;
    mainsIncomingRem!: String;
    totalMainsIncomingOb!: String;
    totalMainsIncomingRem!: String;
    noPannelSupplittingOb!: String;
    noPannelSupplittingRem!: String;
    totalNoOutDoorRequipmentOb!: String;
    totalNoOutDoorRequipmentRem!: String;
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
    spΩdModelRem!: String;
    spdClassTypeOb!: String;
    spdClassTypeRem!: String;
    spdApplicationOb!: String;
    spdApplicationRem!: String;
    spdMainApplicationOb!: String;
    spdMainApplicationRem!: String;
    properConnectionOb!: String;
    properConnectionRem!: String;
    incomerRatingOb!: String;
    incomerRatingRem!: String;
    fuseBackUpOb!: String;
    fuseBackUpRem!: String;
    lengthOfConnectingWirePhaseOb!: String;
    lengthOfConnectingWirePhaseRem!: String;
    lengthOfConnectingWireProtectiveOb!: String;
    lengthOfConnectingWireProtectiveRem!: String;
    sizeOfConnectingWirePhaseOb!: String;
    sizeOfConnectingWirePhaseRem!: String;
    sizeOfConnectingWireProtectiveOb!: String;
    sizeOfConnectingWireProtectiveRem!: String;
    spdDescriptionId!: number;
}