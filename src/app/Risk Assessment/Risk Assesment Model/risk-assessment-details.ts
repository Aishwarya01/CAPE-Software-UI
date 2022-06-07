export class RiskAssessmentDetails {

    structureCharacteristics!:StructureCharacteristics[];
    
    riskId!:Number;
    userName!: String;
    createdDate!: Date;
    createdBy!: String;
	updatedDate!: Date;
    updatedBy!: String;
}

export class StructureCharacteristics {
    location!: String;
    otherLocation!: String;
    groundFlashDensity!: String;
    typeOfBuilding!: String;
    structureScreeningEffectiveness!: String;
    internalScreeningEffectiveness!: String;
    protrusionLenght!: String;
    protrusionWidth!: String;
    protrusionHeight!: String;
    heighestRoofProtrusion!: String;
    collectionAreaOfStructure!: String;
    collAreaOfStrucWithProtrusion!: String;
    collAreaOfNearStructure!: String;
    heightNearByStructure!: String;
    telephoneServiceLine!: String;
    environment!: String;
    noOfDangerousEventOnStructure!: String;
    noOfDangerousEventNearStructure!: String;
    protectionPartOFBuilding!: String;
    protectionLenght!: String;
    protectionWidth!: String;
    protectionHeight!: String;
    protectionCollectionArea!: String;
    adjacentBuilding!: String;
    adjacentLength!: String;
    adjacentWidth!: String;
    adjacentHeight!: String;
    collAreaOfAdjacentStruc!: String;
    noOfDangEventOnAdjacentStruc!: String;
    noOfPeopleInBuilding!: String;
    noOfPeopleInZone!: String;
    dayPeoplePresentBuilding!: String;
    yearPeoplePresentBuilding!: String;

    structureCharacteristicsId!: Number;
    riskId!: Number;
    userName!: String;
    updatedBy!: String;
    updatedDate!: String;

    explosion!: String;
    explosion1!: String;
    fire!: String;
    none!: String;

    structureAttributes!:StructureAttributes[];
    losses!:Losses[];
    protection!:Protection[];
    riskProtection!:RiskProtection[];

}

export class StructureAttributes {
    stTypeOfFloorSurface!: String;
    stAdditionalProtection!: String;
    stRiskOfFire!: String;
    stFireProtectionMeasure!: String;
    stTypeOfInternalWiring!: String;
    totalNoOfLines!: String;
    noOfPowerLines!: String;
    typeOfPowerLines!: String;
    lengthOfPowerLines!: String;
    shieldingGroundingIsolation!: String;
    collAreaOfPowerLines!: String;
    collAreaOfNearLines!: String;
    eventNearThePowerLines!: String;
    eventOnThePowerLines!: String;
    noOfTelecomLines!: String;
    typeOfTelecomLines!: String;
    lengthOfTelecomLines!: String;
    shieldingGroundingIsolationL1!: String;
    collAreaOfTelecomLines!: String;
    collNearOfTelecomLines!: String;
    eventNearTheTelecomeLines!: String;
    eventOnTheTelecomLines!: String;

    structureAttributesId!: Number;
}

export class Losses {
    hazardClassification!: String;
    humanLossOfphysicalDamage!: String;
    humanLossOffailureOfInternalSystem!: String;
    humanLossOfInjuryOfElectricShock!: String;
    humanLossOfPhysicalDamageL1!: String;
    humanLossOffailureOfInternalSystemL1!: String;
    serToPubPhysicalDamage!: String;
    serToPubfailureOfInternalSystem!: String;
    serToPubPhysicalDamageL1!: String;
    serToPubfailureOfInternalSystemL1!: String;
    culHerOfPhysicalDamage!: String;
    culHerOfPhysicalDamageL1!: String;
    ecoLossOfPhysicalDamage!: String;
    ecoLossOfFailureOfInternalSystem!: String;
    ecoLossOfInjuryOfElectricShock!: String;
    ecoLossOfPhysicalDamageL1!: String;
    ecoLossOfFailureOfInternalSystemL1!: String;
    classOfLPS!: String;
    classOfSPD!: String;
    lossesId!: Number;
}

export class Protection {
    // Loss of Human Life
    protectionId!: Number;
    protectionPEB!: Number;
    protectionPMS!: Number;
    protectionPM!: Number;
    protectionPA!: Number;
    protectionPC!: Number;
    protectionPU!: Number;
    protectionPV!: Number;
    protectionPW!: Number;
    protectionPZ!: Number;
    // RISK OF LOSS OF HUMAN BEINGS (R1)	
    riskProtectionRA1!: Number;
    riskProtectionRB1!: Number;
    riskProtectionRC1!: Number;
    riskProtectionRM1!: Number;
    riskProtectionRU1!: Number;
    riskProtectionRV1!: Number;
    riskProtectionRW1!: Number;
    riskProtectionRZ1!: Number;
    riskProtectionRD1!: Number;
    riskProtectionRI1!: Number;
    riskProtectionR1!: Number;
    riskProtectionRB2!: Number;
}

export class RiskProtection {
    riskProtectionId!: Number;
    riskProtectionRC2!: Number;
    riskProtectionRM2!: Number;
    riskProtectionRV2!: Number;
    riskProtectionRW2!: Number;
    riskProtectionRZ2!: Number;
    riskProtectionRD2!: Number;
    riskProtectionRI2!: Number;
    riskProtectionR2!: Number;
    riskProtectionRB3!: Number;
    riskProtectionRV3!: Number;
    riskProtectionRD3!: Number;
    riskProtectionR3!: Number;
    riskProtectionRA4!: Number;
    riskProtectionRB4!: Number;
    riskProtectionRC4!: Number;
    riskProtectionRM4!: Number;
    riskProtectionRU4!: Number;
    riskProtectionRV4!: Number;
    riskProtectionRW4!: Number;
    riskProtectionRZ4!: Number;
    riskProtectionRD4!: Number;
    riskProtectionRI4!: Number;
    riskProtectionR4!: Number;
}