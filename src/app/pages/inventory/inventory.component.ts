import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Item } from 'src/models/item';
import { FormComponent } from '../form/form.component';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit{
    error?: string;
    itemList!: Item[];
    items: string[] = [
      'Maia', 'Maia',
      'Maia', 'Maia',
      'Maia'
    ];
    constructor(public dialog: MatDialog, public itemService: ItemService) { }
    getItems(): void {
      this.itemService.getItems().subscribe((list:Item[]) => { 
        this.itemList = list;
  }, (err: string) => {
    this.error = err;
  });
};

    deleteItem(id: number | undefined): void {
      this.itemService.delete(id!).subscribe(() => {
        window.location.reload();
      }, (err: string) => {
        this.error = err;
      })
    }

    


    async openDialog() {
      const dialogRef = this.dialog.open(FormComponent, {
        width: '250px',
        data: { items: this.items },
      });
      dialogRef.afterClosed().subscribe(() => {
        console.log("The dialog was closed");
      });
    };
    ngOnInit(): void {

    }
}