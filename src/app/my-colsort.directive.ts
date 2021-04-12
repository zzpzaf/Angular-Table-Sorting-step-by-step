import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appMyColsort]',
  host: {'[class.colorsortasc]': 'direct==="asc"',
         '[class.colorsortdesc]': 'direct==="desc"'}
})
export class MyColsortDirective {


  @Input() direct: string = '';


  constructor() { }

}
