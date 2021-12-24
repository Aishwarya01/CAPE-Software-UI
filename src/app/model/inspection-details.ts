export class InspectionDetails {
  periodicInspectionId!: number;
  userName!: String;
  siteId!: number;
  createdBy!: String;
  createdDate!: Date;
  //ipaoInspectionId!: number;

  ipaoInspection!: IpaInsection[];
}

export class IpaInsection { 
  locationNumber!: Number;
  locationName!: String;
  serviceCable!: String;
  serviceFuse!: String;
  meterDistributor!: String;
  meterConsumer!: String;
  meterEqu!: String;
  isolator!: String;
  earthingArrangement!: String;
  adequateArrangement!: String;
  connectionGenerator!: String;
  compatibilityCharacteristics!: String;
  automaticDisconnectGenerator!: String;
  preventConnectGenerator!: String;
  isolateGenerator!: String;
  mainEarting!: String;
  earthElectordeArrangement!: String;
  earthConductorConnection!: String;
  accessibility!: String;
  aainProtectBonding!: String;
  allProtectBonding!: String;
  allAppropriateLocation!: String;
  felvRequirement!: String;
  selvSystem!: String;
  pelvSystem!: String;
  doubleInsulation!: String;
  reinforcedInsulation!: String;
  basicElectricalSepartion!: String;
  isolatePublicSupply!: String;
  insulationLiveParts!: String;
  barriersEnclosers!: String;
  supplementaryBonding!: String;
  placingOutReach!: String;
  nonConductLocation!: String;
  faultElectricalSepartion!: String;
  faultNonConductLocation!: String;
  operatingCurrent!: String;
  inspectionFlag!: String;


  inspectionOuterObervation!:InspectionOuterObervation[];
  consumerUnit!: consumerUnit[];
  circuit!: circuit[];
  isolationCurrent!:isolationCurrent[];
}

export class InspectionOuterObervation{
  
  inspectionOuterObservationId!:number;
  observationComponentDetails!: String;
  observationDescription!: String;
  inspectionOuterObservationStatus!: String;

  inspectionInnerObservations!:InspectionInnerObervations[];
}
export class InspectionInnerObervations{
  inspectionOuterObservationId!: number;
  inspectionInnerObservationsId!: number;
  observationComponentDetails!: String;
  observationDescription!: String;
  inspectionInnerObervationStatus!: String;
}
export class consumerUnit { 
  consumerId: number;
  ipaoInspectionId: number;
  accessWorking!: String;
  securityFixing!: String;
  livePartsDamage!: String;
  securityBarriers!: String;
  suitabilityEnclosure!: String;
  enclosureDamaged!: String;
  presenceObstacles!: String;
  placingOutOfConsumer!: String;
  presenceMainSwitches!: String;
  operationMainSwitches!: String;
  manualCircuitBreakers!: String;
  switchCausesRcd!: String;
  rcdFaultProtection!: String;
  rcdAdditionalProtection!: String;
  overVoltageProtection!: String;
  indicationOfSpd!: String;
  rcdQuarterlyTest!: String;
  diagramsCharts!: String;
  nonstandardCableColour!: String;
  alSupplyOfOrign!: String;
  alSupplyOfMeter!: String;
  alSupplyDistribution!: String;
  allPointsIsolation!: String;
  nextInspection!: String;
  otherRequiredLabelling!: String;
  basesCorrectType!: String;
  singlePole!: String;
  mechanicalDamage!: String;
  electromagnetic!: String;
  allConductorCon!: String;
  consumerStatus!: String;
}

export class circuit{
  circuitId: number;
  ipaoInspectionId: number;
  identificationConductors!: String;
  cableInstallation!: String;
  examinationCables!: String;
  examinationInsulation!: String;
  nonSheathedCables!: String;
  containmentSystems!: String;
  temperatureRating!: String;
  cablesTerminated!: String;
  currentCarryCapacity!: String;
 // operationMainSwitches!: String;
 // manualCircuitBreakers!: String;
 // switchCausesRcd!: String;
  adequacyProtectDevices!: String;
  //rcdAdditionalProtection!: String;
  presenceProtectConductors!: String;
  coOrdination!: String;
  wiringSystems!: String;
  cablesConcealUnderFloors!: String;
  operatingCurrentCircuits!: String;
  provisionFireBarriers!: String;
  sectionsRegardlessDepth!: String;
  cablesConcDepth!: String;
  operatingCurrentSocket!: String;
  separationBand!: String;
  separationElectrical!: String;
  conditionCircuitAccessories!: String;
  conductorCorrectTerminated!: String;
  conductorVisibleOutside!: String;
  connLiveConductors!: String;
  adequatelyConnectedEnclosure!: String;
  suitabilityCircuitAccessories!: String;
  conditionAccessories!: String;
  singlePoleDevices!: String;
  adequacyConnections!: String;
  isolationSwitching!: String;
  circuitStatus!: String;
}
export class isolationCurrent{
  presenceDevices!: String;
  conditionDevices!: String;
  locationDevices!: String;
  capableSecured!: String;
  operationVerify!: String;
  installCircuit!: String;
  warningLabel!: String;
  swPresenceDevices!: String;
  swConditionDevices!: String;
  swAcceptableLocation!: String;
  swCapableOffPosition!: String;
  swCorrectOperation!: String;
  swCircuit!: String;
  swWarningLabel!: String;
  emSwitPresenceDevices!: String;
  emSwitConditionDevices!: String;
  emSwitLocationDevices!: String;
  emSwitOperationVerify!: String;
  emSwitInstallCircuit!: String;
  fuSwitPresenceDevices!: String;
  fuSwitLocationDevices!: String;
  fuSwitOperationVerify!: String;

  suitabilityEquipment!: String;
  enclosureNotDamaged!: String;
  suitabilityEnvironment!: String;
  securityFixing!: String;
  cableEntryHoles!: String;
  provisionVoltage!: String;
  provisionOverload!: String;
  correctTypeLamps!: String;
  insulaDisplacementBox!: String;
  overheatSurrounding!: String;
  overheatConductors!: String;
}

