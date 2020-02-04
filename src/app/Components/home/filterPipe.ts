import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Local} from '../../Models/Local';

@Pipe({name: 'filter'})
@Injectable()
export class FilterPipe implements PipeTransform {
  // transform(items: any[], term: any): any {
  //   if (term === undefined) { return items; }
  //
  //   return items.filter( function func(item)  {
  //     for (const property in item) {
  //
  //       if (item[property] === null) {
  //         continue;
  //       }
  //       if (item[property].toString().toLowerCase().includes(term.toLowerCase())) {
  //         return true;
  //       }
  //
  //     }
  //     return false;
  //   });
  // }
  transform(locals: Local[], address: string , type: string, status: string,
            minPrice: number, maxPrice: number, minArea: number, maxArea: number,
            roomsNumber: number ): Local[] {
    // tslint:disable-next-line:max-line-length
    if (!locals || (!address && !type && !status && !minPrice && !maxPrice && !minArea && !maxArea && roomsNumber === 1) ) { return locals; }

    if (!maxPrice) { maxPrice = 9999999999999999999999; }
    if (!maxArea) { maxArea = 9999999999999999999999; }
    console.log('maxPrice : ', maxPrice );
    return locals
      .filter( local => local.address.toLocaleLowerCase().indexOf(address.toLocaleLowerCase()) !== -1 )
      .filter(local => local.type.toLocaleLowerCase().indexOf(type.toLocaleLowerCase()) !== -1 )
      .filter(local => local.transactionType.toLocaleLowerCase().indexOf(status.toLocaleLowerCase()) !== -1)
      .filter(local => local.price >= minPrice)
      .filter(local => local.price <= maxPrice)
      .filter(local => local.area >= minArea)
      .filter(local => local.area <= maxArea)
      .filter(local => local.roomsNumber >= roomsNumber)
    ;
  }


}
