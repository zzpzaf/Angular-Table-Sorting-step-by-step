
import { Component, OnInit} from '@angular/core';
import { Emp, EMPLOYEES, fieldsNames, headerFields, RestapiService } from '../restapi.service';

const arrDirectionOptios = ['asc', 'desc', ''] ;

// IT Works: Union type with predefined literal values from array const //Angular version 3.4 and onwards
type SortDirection = typeof arrDirectionOptios[0] | typeof arrDirectionOptios[1] | typeof arrDirectionOptios[2]; 

//const rotatedirection: {[key in SortDirection]: SortDirection} = { asc: 'desc', desc: '', '': 'asc' };
const rotate: {[key in SortDirection]: SortDirection} = { asc: arrDirectionOptios[1], desc: '', '': arrDirectionOptios[0] };

// This is a more generan Comparison function for ascending order sorting
// We cam always reverse the result for descending order.
const compareAsc = (v1: any, v2: any) => v1 > v2 ? 1 : v1 < v2 ? -1 : 0;


@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})

export class MyTableComponent implements OnInit {

  public empls: Emp[] = [];
  public rempls: Emp[] = [];
  public hfs: string[] = headerFields;
  public fns: string[] = fieldsNames;
  //public hfsd: string[] = ['','','',''];

  //public direction!: SortDirection; 
  public colDirections: SortDirection[] = [] ;  

  //@ViewChildren(MyColsortDirective) myList!: QueryList<MyColsortDirective>;



  constructor(private myphpapi: RestapiService) {}

  ngOnInit(): void {

    //this.empls = EMPLOYEES;  

    this.colDirections = ['','',''];    // Initial is '' --> not ordered,
    //this.direction = arrDirectionOptios[2]  // Initial is '' --> not ordered, asc'--> ascending order, etc. 

    this.empls = EMPLOYEES;
    this.rempls = EMPLOYEES;

    this.getRempls();
 

  }


  // 210317  
  getRempls(): void {

    let lempls: Emp[] = [];  

    this.myphpapi.getEmployees()
    .subscribe(
      resp => {
        //console.log(resp);
        // Here we can change the keys of the resp object provided, if
        // they are with different names than the fields we defined in a
        // Country object.
        let arrdata = resp.employees as Emp[];
        if (arrdata !== undefined) {
          for (const data of resp.employees as Emp[]) {
            lempls.push(data);
          }
          this.rempls = lempls;  
          this.empls = lempls;        
        } 
      }
    );  

  }

  onSort(column: string) {

    //this.colDirections = ['','',''];
    let s : number = this.fns.indexOf(column);
    this.colDirections[s] = rotate[this.colDirections[s]];

    let i : number;
    for(i = 0; i<this.fns.length; i++) {
      if (i !== s) {
        this.colDirections[i] = '';
      };
   }
    //this.empls = this.sort(EMPLOYEES, column, this.colDirections[s]);
    this.empls = this.sort(this.rempls, column, this.colDirections[s]);
  }


  sort(inEmpls: Emp[], field: string, direction: SortDirection): Emp[] {
  
    let sortedEmployees: Emp[] = [];
    if (direction === '') {
      sortedEmployees = inEmpls; 
    } else {
      sortedEmployees = [...inEmpls].sort((a,b) => {
        const res = compareAsc(a[field as keyof Emp], b[field as keyof Emp]);
        return (direction === arrDirectionOptios[1])? -res : res;   //If it is  'desc'
       });   }
       //this.direction = rotate[this.direction]; 
   
    return sortedEmployees; 
  }	

}
