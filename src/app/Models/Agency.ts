import {User} from './User';

export class Agency extends User {
  agencyName: string;
  taxRegistration: string;


  constructor(username: string, email: string, password: string, agencyName: string, taxRegistration: string) {
    super(username, email, password);
    this.agencyName = agencyName;
    this.taxRegistration = taxRegistration;
  }
}
