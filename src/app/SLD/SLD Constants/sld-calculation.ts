export class SldCalculation {
    decimalValue: any = [];

    constructor() {
        this.sldData();
    }

    sldData(){
        this.decimalValue[0] = { nominalCrossSection:"1.5", specificConductor: 12.575 }
        this.decimalValue[1] = { nominalCrossSection:"2.5", specificConductor: 7.566 }
        this.decimalValue[2] = { nominalCrossSection:"4", specificConductor: 4.739 }
        this.decimalValue[3] = { nominalCrossSection:"6", specificConductor: 3.149 }
        this.decimalValue[4] = { nominalCrossSection:"10", specificConductor: 1.881 }
        this.decimalValue[5] = { nominalCrossSection:"16", specificConductor: 1.185 }
        this.decimalValue[6] = { nominalCrossSection:"25", specificConductor: 0.752 }
        this.decimalValue[7] = { nominalCrossSection:"35", specificConductor: 0.546 }
        this.decimalValue[8] = { nominalCrossSection:"50", specificConductor: 0.404 }
        this.decimalValue[9] = { nominalCrossSection:"70", specificConductor: 0.281 }
        this.decimalValue[10] = { nominalCrossSection:"95", specificConductor: 0.204 }
        this.decimalValue[11] = { nominalCrossSection:"120", specificConductor: 0.163 }
        this.decimalValue[12] = { nominalCrossSection:"150", specificConductor: 0.134 }
        this.decimalValue[13] = { nominalCrossSection:"182", specificConductor: 0.109 }
    }
}
