export class EmcElectromagneticCompatibility {

    emcId!: number;
    userName!: String;

    seSinglePoint!: String;
    seMeshedArrangment!: String;
    seDescription!: String;
    equiptentialBonding!: String;
    resistanceCabinet!: String;
    resistanceCabinetDesc!: String;
    roomShield!: String;
    roomShieldDesc!: String;
    shieldingOtherDesc!: String;
    equipmentHighFrequency!: String;
    equipmentHighFrequencyDesc!: String;
    approximateDistance!: String;
    equipmentMaintence!: String;
    equipmentMaintenceDesc!: String;
    operationFrequency!: String;
    radiatedPower!: String;

    externalCompatibility!: ExternalCompatibility[];



}

export class ExternalCompatibility {

    communication!: String;
    visibilityOfAntennas!: String;
    typeOfTransmission!: String;
    transmissionDesc!: String;
    antennaDistance!: String;
    noOfWalls!: String;
    losDesc!: String;
    electronicSystemDistance!: String;
    transmitterPower!: String;
    frequency!: String;
    orientationAntinna!: String;
    systemSite!: String;
    systemSiteDesc!: String;
    controlledLoads!: String;
    controlledLoadsDesc!: String;
    electricRailway!: String;
    electricRailwayDesc!: String;
    hvTransmission!: String;
    hvTransmissionDesc!: String;
    hpAcMangets!: String;
    hpAcMangetsDesc!: String;
    approximateDistance!: String;
    rfiSurvey!: String;
    newRfiSurvey!: String;
    newRfiSurveyDesc!: String;
    
}
