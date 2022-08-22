export class ProtectiveEarthConductor {
  equipBondConnID!: number;
  nodeId!: String;
  fileName!: String;
  userName!: String;
  updatedBy!: String;
  createdDate!: Date; 
  createdBy!: String;
  updatedDate!: Date;

  safetyTestingEquipotential_Bonding!: SafetyTestingEquipotential_Bonding[];
}

export class SafetyTestingEquipotential_Bonding {
  rN!: String;
  yN!: String;
  bN!: String;
  rE!: String;
  yE!: String;
  bE!: String;
  rY!: String;
  yB!: String;
  bR!: String;
}

