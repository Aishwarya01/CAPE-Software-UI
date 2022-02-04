export class EmcPowerAndEarthingData {

    userName!: String;
    emcId!: number;
    powerEarthingDataId!:number;
    powerElectricalUtility!: String;
    powerBackupSource!: String;
    powerDistanceHvLv!: String;
    powerCableHvLv!: String;
    powerDiscSupply!: String;
    powerTransformationKVA!: String;
    // powerInput
    powerInputVolts!: String;
    powerInputPhase!: String;
    powerInputWires!: String;
    powerInputFeed!: String;
    powerInputDesc!: String;
    // powerOutput
    powerOutputVolts!: String;
    powerOutputPhase!: String;
    powerOutputWires!: String;
    powerOutputFeed!: String;
    powerIncomingAmps!: String;
    powerNeutral!: String;
    psEarthing!: String;
    peAttachement!: String;
    // bsEntrance
    dedicatedTransfermation!: String;
    dedicatedTransfermationOtherBuilding!: String;
    typeOFIncoming!: String;
    descOfService!: String;
    descOfTestingService!: String;
    descOfEquipotentilaBonding!: String;

    createdDate!: Date;
    createdBy!: String;
    updatedBy!: String;
    updatedDate!: Date;

    electronicSystem!: ElectronicSystem[];
    distrubutionPannel!: DistrubutionPannel[];
}

export class ElectronicSystem {
    electronicSystemId!: number;
    bDSld!: String;
    bDRecordData!: String;
    bDEarthing!: String;
    electronicDesc!: String;
    panelId!: number;
    namePlateData!: String;
    mainCircuteBraker!: String;
    mainCircuteBrakerRating!: String;
    emergencyTripRemote!: String;
    emergencyTripLocal!: String;
    otherTrip!: String;
    differentalProtection!: String;
    bouodingStell!: String;
    panelFeed!: String;
    phaseWires!: String;
    neutralWire!: String;
    peWireSize!: String;
    pannelConnectors!: String;
    neutralBus!: String;
    earthBus!: String;
    listOfNonElectronicLoad!: String;
    dedicatedElectronicSystem!: String;
    nonComputerLoads!: String;
}

export class DistrubutionPannel {

    distrubutionPannelId!:number;
    cbWireSize!: String;
    cbDesc!: String;
    matchesReceptable!: String;
    matchesReceptableDesc!: String;
    indivdialPwire!: String;
    indivdialPwireDesc!: String;
    indivdialNeutralwire!: String;
    indivdialNeutralwireDesc!: String;
    computerLoadCircute!: String;
    computerLoadCircuteDes!: String;
    computerLoadReceptable!: String;
    computerLoadReceptableDesc!: String;
    branchCircuteRun!: String;
    branchCircuteRunDesc!: String;
    frequencyCyclidLoads!: String;
    frequencyCyclidLoadsDesc!: String;
    conductors!: String;
    conductorsDesc!: String;
}
