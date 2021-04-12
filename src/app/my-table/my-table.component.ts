
import { Component, OnInit} from '@angular/core';


interface Emp {  
  firstName: string;  
  lastName: string;  
  age: number;  
  joinedDate: Date;
}



const EMPLOYEES: Emp[] = [
 {
     firstName: 'John',
     lastName: 'Ripper',
     age: 47,
     joinedDate: new Date('November 16, 2020')
 },

 {
     firstName: 'Ana',
     lastName: 'Karenina',
     age: 22,
     joinedDate: new Date('March 25, 2019')
 },

 {
     firstName: 'Alan',
     lastName: 'Pikard',
     age: 33,
     joinedDate: new Date('April 11, 2018')
 }
];


// ******************************************************************************************************

const headerFields: string[] = ['First Name','Last Name', 'Age', 'Date Joined'];
const fieldsNames: string[] = ['firstName','lastName', 'age', 'joinedDate'];
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
  public hfs: string[] = headerFields;
  public fns: string[] = fieldsNames;
  //public hfsd: string[] = ['','','',''];

  //public direction!: SortDirection; 
  public colDirections: SortDirection[] = [] ;  

  //@ViewChildren(MyColsortDirective) myList!: QueryList<MyColsortDirective>;



  constructor() { }

  ngOnInit(): void {

    this.empls = EMPLOYEES;  
    this.colDirections = ['','',''];    // Initial is '' --> not ordered,
    //this.direction = arrDirectionOptios[2]  // Initial is '' --> not ordered, asc'--> ascending order, etc. 

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
    

    // resetting other headers
    // this.myList.forEach(listProp => {
    //   if (listProp.colname !== column) {
    //     listProp.direct = '';
    //   }
    //   console.log(column, listProp.colname, listProp.direct);
    // });


    this.empls = this.sort(EMPLOYEES, column, this.colDirections[s]);


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




















  sort1(inEmpls: Emp[], field: string, direction: SortDirection): Emp[] {
  
    let sortedEmployees: Emp[] = [];
    if (direction === '') {
      sortedEmployees = inEmpls; 
    } else {
       if (direction === arrDirectionOptios[1]) {
          sortedEmployees = [...inEmpls].sort((a,b) => (a[field as keyof Emp] < b[field as keyof Emp] ? 1 : -1)); 	
       } else {
          sortedEmployees = [...inEmpls].sort((a,b) => (a[field as keyof Emp] < b[field as keyof Emp] ? -1 : 1));
       }
    }
    return sortedEmployees; 
  }	





  // setSortIndication(col: string):void{

  //   for (var i in this.hfs) {
  //     if (col === this.fns[i]) {
  //       this.hfsd[i] = (this.direction === '') ? '' : '[' + this.direction + ']';
  //     }else {
  //       this.hfsd[i] = '';
  //     }
  //   }

  // }

}
