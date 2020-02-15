import {User} from './User';

export class Client extends User{
  firstName: string;
  lastName: string;
  birthdate: string;

  constructor(username: string, email: string, password: string, firstname: string, lastname: string, birthdate: string) {
    super(username, email, password);
    this.firstName = firstname;
    this.lastName = lastname;
    this.birthdate = birthdate ;
  }
}
