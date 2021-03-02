import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { Item } from '@app/_models/item';
import { ItemCategory } from '@app/_models/itemCategory';
import { SpService } from '@app/_services/sp.service';
import { fadeInRightAnimation } from 'src/@sp/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sp/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sp/shared/list/list-column.model';
import { ItemCreateUpdateComponent } from './item-create-update/item-create-update.component';

@Component({
  selector: 'sp-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class ItemComponent implements OnInit, OnDestroy {
  items: Item[];
  displayItems: Item[];
  itemCategories: ItemCategory[];
  selectedItemCategoryId: any | 0;

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    {
      name: 'Item Code',
      property: 'itemCode',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Item Category',
      property: 'categoryName',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Is New',
      property: 'isNew',
      visible: true,
      isModelProperty: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<Item> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private spService: SpService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllItemCategories();
    this.getAllItems();
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */

  getAllItemCategories() {
    this.spService._itemCategoryService
      .getAllItemCategories()
      .subscribe((response) => {
        if (response) {
          this.itemCategories = response;
        }
      });
  }

  getAllItems() {
    this.spService._itemService.getAllItems().subscribe((response) => {
      if (response) {
        this.items = response;
        this.displayItems = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.displayItems;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  createItem() {
    const dialogData = { itemCategories: this.itemCategories };
    this.dialog
      .open(ItemCreateUpdateComponent, {
        data: dialogData,
        width: '25%',
      })
      .afterClosed()
      .subscribe((item: Item) => {
        /**
         * Item is the updated item (if the user pressed Save - otherwise it's null)
         */
        item.isNew = false;
        if (item) {
          this.spService._itemService.createItem(item).subscribe((response) => {
            this.getAllItems();
            this.snackbar.open('Creation Successful', 'x', {
              duration: 3000,
              panelClass: 'notif-success',
            });
          });
          this.items.unshift(new Item(item));
        }
      });
  }

  updateItem(item) {
    const dialogData = {
      itemCategories: this.itemCategories,
      item: item,
    };
    this.dialog
      .open(ItemCreateUpdateComponent, {
        data: dialogData,
        width: '25%',
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((item) => {
        /**
         * Item is the updated item (if the user pressed Save - otherwise it's null)
         */
        if (item) {
          this.spService._itemService
            .updateItem(item.id, item)
            .subscribe((response) => {
              this.getAllItems();
              this.snackbar.open('Update Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
        }
      });
  }

  deleteItem(item) {
    this.spService._itemService.deleteItem(item.id).subscribe((response) => {
      this.getAllItems();
      this.snackbar.open('Deletion Successful', 'x', {
        duration: 3000,
        panelClass: 'notif-success',
      });
    });
  }

  filterByItemCategoryId() {
    if (this.selectedItemCategoryId > 0) {
      this.displayItems = this.items.filter(
        (x) => x.categoryId === this.selectedItemCategoryId
      );
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayItems;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.displayItems = this.items;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayItems;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  confirmDialog(item): void {
    const message = `Are you sure you want to delete this?`;

    const dialogData = {
      icon: 'delete',
      title: 'Delete',
      message: message,
      icolor: 'warn',
    };

    this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.deleteItem(item);
        }
      });
  }

  ngOnDestroy() {}
}
