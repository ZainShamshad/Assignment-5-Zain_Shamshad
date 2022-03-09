import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appender'
})
export class AppenderPipe implements PipeTransform {

  transform(value: string, prefix: string): string {
    return prefix+value;
  }

}
