
export class User {
    id: number = 0;
    firstname: String = '';
    lastname: String = '';
    email: string = '';
    username: String = '';
    usertype: String = '';
    password: string = '';
    active: boolean = false;
    role: String = '';
    authorisedUser: String = '';
    otp!: number;
    mobileNumber: String = '';
    constructor () {
    }
}
