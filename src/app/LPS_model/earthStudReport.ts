export class earthStudReport {
    earthStudReportId!: number;
    basicLpsId!: number;
    userName!: String;
    createdDate!: String;
    createdBy!: String;
    updatedBy!: String;
    updatedDate!: String;

    earthStudDescription!: earthStudDescription[];
}

export class earthStudDescription {
    earthStudDescId!: number;
    buildingNumber!: number;
    buildingName!: String;
    buildingCount!: number;
    flag!: String;
    availableEquipotentialBondingOb!: String;
    availableEquipotentialBondingRem!: String;
    numberOfEquipotentialBondingOb!: String;
    numberOfEquipotentialBondingRem!: String;
    sizeOfEarthingConductorOb!: String;
    sizeOfEarthingConductorRem!: String;
    conceptOfEquipotentialBondingOb!: String;
    conceptOfEquipotentialBondingRem!: String;
    mainProtectiveEquipotentialBondingOb!: String;
    mainProtectiveEquipotentialBondingRem!: String;
    sizeOfMainProtectiveOb!: String;
    sizeOfMainProtectiveRem!: String;
    supplimentaryMainProtectiveOb!: String;
    supplimentaryMainProtectiveRem!: String;
    sizeOfSupplimentaryProtectiveOb!: String;
    sizeOfSupplimentaryProtectiveRem!: String;
    earthStudVisibilityOb!: String;
    earthStudVisibilityRem!: String;
    earthStudBendOb!: String;
    earthStudBendRem!: String;
    properBondingRailOb!: String;
    properBondingRailRem!: String;
    physicalDamageStudOb!: String;
    physicalDamageStudRem!: String;
    continutyExistaEarthOb!: String;
    continutyExistaEarthRem!: String
}