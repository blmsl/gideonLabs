import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'catLink'
})
export class CatLinkPipe implements PipeTransform {
  transform(value: any): any {
    const linkSplit: string[] = value.split('/');
    const catIndex: number = linkSplit.indexOf('category');
    const endIndex: number = linkSplit.length;
    const finalArray: string[] = [];

    for (let i: number = catIndex + 1; i < endIndex; i++) {
      finalArray.push(linkSplit[i]);
    }

    return finalArray;
  }
}
