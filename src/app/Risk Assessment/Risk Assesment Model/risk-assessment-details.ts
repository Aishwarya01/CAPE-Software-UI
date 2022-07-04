export class RiskAssessmentDetails {

    structureCharacteristics!:StructureCharacteristics[];
    
    riskId!:Number;
    userName!: String;
    projectName!: String;
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

    structureAttributes!:StructureAttributes[];
    losses!:Losses[];
    protection!:Protection[];
    riskProtection!:RiskProtection[];
    calculatedRisk!:CalculatedRisk[];

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
    
    protectionPEB!: String;
    protectionPMS!: String;
    protectionPM!: String;
    protectionPA!: String;
    protectionPC!: String;
    protectionPU!: String;
    protectionPV!: String;
    protectionPW!: String;
    protectionPZ!: String;

    // RISK OF LOSS OF HUMAN BEINGS (R1)	
    riskProtectionRA1!: String;
    riskProtectionRB1!: String;
    riskProtectionRC1!: String;
    riskProtectionRM1!: String;
    riskProtectionRU1!: String;
    riskProtectionRV1!: String;
    riskProtectionRW1!: String;
    riskProtectionRZ1!: String;

    // R2
    riskProtectionRB2!: String;

    // RISK OF LOSS OF CULTURAL HERITAGE (R3)
    culturalRB!: String;
    culturalRV!: String;
}

export class RiskProtection {
    riskProtectionId!: Number;

    // R2
    riskProtectionRC2!: String;
    riskProtectionRM2!: String;
    riskProtectionRV2!: String;
    riskProtectionRW2!: String;
    riskProtectionRZ2!: String;

    // RISK OF LOSS OF ECONOMIC VALUE (R4)
    econamicValueRA!: String;
    econamicValueRB!: String;
    econamicValueRC!: String;
    econamicValueRM!: String;
    econamicValueRU!: String;
    econamicValueRV!: String;
    econamicValueRW!: String;
    econamicValueRZ!: String;
}

export class CalculatedRisk {
    calculatedRiskId!: Number;

    // VALUES OF TOLERABLE RISK (RT)
    lossOfHumanLifeRT1!: String;
    lossOfPublicSerivceRT2!: String;
    lossOfCulturalHeritageRT3!: String;
    economicLossRT4!: String;

    riskProtectionR1!: String;
    riskProtectionR2!: String;
    riskProtectionR3!: String;
    riskProtectionR4!: String;

    riskProtectionRD1!: String;
    riskProtectionRD2!: String;
    riskProtectionRD3!: String;
    riskProtectionRD4!: String;

    riskProtectionRI1!: String;
    riskProtectionRI2!: String;
    riskProtectionRI3!: String;
    riskProtectionRI4!: String;
}