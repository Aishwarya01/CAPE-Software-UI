export class RiskAssessmentDetails {

    structureCharacteristics!:StructureCharacteristics[];
    structureAttributes!:StructureAttributes[];
    losses!:Losses[];
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
    SerToPubPhysicalDamage!: String;
    serToPubfailureOfInternalSystem!: String;
    SerToPubPhysicalDamageL1!: String;
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
