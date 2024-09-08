import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeBase64Hash',
  standalone: true
})
export class DecodeBase64HashPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
