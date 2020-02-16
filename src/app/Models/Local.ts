import {User} from './User';

export class Local {
  idLocal: number;
  address: string;
  area: number;
  description: string;
  price: number;
  roomsNumber: number;
  transactionType: string;
  fileName: string;
  filePath: string;
  type: string;
  user: User;
  userWished: User[];
  hasWished: boolean;
}
