import {Local} from './Local';

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  image: string ;
  phoneNumber: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  agencyName: string;
  taxRegistration: string;
  dtype: string;
  locals: Local[];
  wishList: Local[];

}
