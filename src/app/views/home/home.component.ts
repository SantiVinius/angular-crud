import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

export interface PeriodicElement {
  id: number,
  name: string;
  description: string;
  value: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 0, name: "Name", description: "description", value: 10},
  {id: 1, name: "Name", description: "description", value: 10},
  {id: 2, name: "Name", description: "description", value: 10},
  {id: 3, name: "Name", description: "description", value: 10},
  {id: 4, name: "Name", description: "description", value: 10},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['name', 'description', 'value', 'actions'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        id: null,
        name: '',
        description: '',
        value: null
      } : element
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        if(this.dataSource.map(item => item.id).includes(result.id)){
          this.dataSource[result.id - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  deleteElement(id: number): void {
    this.dataSource = this.dataSource.filter(product => product.id !== id)
  }

  editElement(element: PeriodicElement): void {
    this.openDialog(element);
  }
}
