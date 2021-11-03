export class Spd {
    spdId!: number;
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
    // mainsIncomingEachPanelOb!: String;
    // mainsIncomingEachPanelRem!: String;
    // streetLightPannelOb!: String;
    // streetLightPannelRem!: String;
    // feedingPowerEquipmentOb!: String;
    // feedingPowerEquipmentRem!: String;

    spdDescription!: SpdDescription[];
}

export class SpdDescription {
    spdDescriptionRole!: String;
    spdTypeOb!: String;
    spdTypeRe!: String;
    spdApplicationOb!: String;
    spdApplicationRem!: String;
    panelNameOb!: String;
    panelNameRem!: String;
    incomingRatingOb!: String;
    incomingRatingRem!: String;
    backupFuseCheckOb!: String;
    backupFuseCheckRem!: String;
    connectingWireLengthOb!: String;
    connectingWireLengthRem!: String;
    connectingWireSizeOb!: String;
    connectingWireSizeRem!: String;
}