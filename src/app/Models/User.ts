import {Local} from './Local';

export class User {
  idUser: number;
  username: string;
  email: string;
  password: string;
  image: string ;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  agencyName: string;
  taxRegistration: string;
  dtype: string;
  locals: Local[];
  wishList: Local[];


  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
