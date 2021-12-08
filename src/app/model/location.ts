export class Location {
    locationArr!: LocationArr[];
    constructor () {
    }
}

export class LocationArr {
    locationNumber: number=0;

   locationName: String="a";
   locationCount: number=0;

    constructor (public loc1:  number,public loc2: String, public loc3: number) {
        this.locationNumber=this.loc1;
        this.locationName=this.loc2;
        this.locationCount= this.loc3;
    }
}


