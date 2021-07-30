export class Location {
    locationArr!: LocationArr[];
    constructor () {
    }
}

export class LocationArr {
    locationNumber: number=0;

   locationName: String="a";

    constructor (public loc1:  number,public loc2: String) {
        this.locationNumber=this.loc1;
        this.locationName=this.loc2;
    }
}


