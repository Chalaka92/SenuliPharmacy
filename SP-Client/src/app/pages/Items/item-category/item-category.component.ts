import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { ItemCategory } from '@app/_models/itemCategory';
import { SpService } from '@app/_services/sp.service';
import { fadeInRightAnimation } from 'src/@sp/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sp/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sp/shared/list/list-column.model';
import { ItemCategoryCreateUpdateComponent } from './item-category-create-update/item-category-create-update.component';

@Component({
  selector: 'sp-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class ItemCategoryComponent implements OnInit, OnDestroy {
  itemCategories: ItemCategory[];

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    {
      name: 'Category Code',
      property: 'itemCategoryCode',
      visible: true,
      isModelProperty: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<ItemCategory> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private spService: SpService,
    private snackbar: MatSnackBar
  ) {}

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
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.itemCategories;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  ngOnInit() {
    this.getAllItemCategories();
  }

  createItemCategory() {
    this.dialog
      .open(ItemCategoryCreateUpdateComponent, { width: '25%' })
      .afterClosed()
      .subscribe((itemCategory: ItemCategory) => {
        /**
         * ItemCategory is the updated itemCategory (if the user pressed Save - otherwise it's null)
         */
        if (itemCategory) {
          this.spService._itemCategoryService
            .createItemCategory(itemCategory)
            .subscribe(
              (response) => {
                this.getAllItemCategories();
                this.snackbar.open('Creation Successful', 'x', {
                  duration: 3000,
                  panelClass: 'notif-success',
                });
              },
              (error) => {
                this.snackbar.open('Creation Failed', 'x', {
                  duration: 3000,
                  panelClass: 'notif-error',
                });
              }
            );
          this.itemCategories.unshift(new ItemCategory(itemCategory));
        }
      });
  }

  updateItemCategory(itemCategory) {
    this.dialog
      .open(ItemCategoryCreateUpdateComponent, {
        data: itemCategory,
        width: '25%',
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((itemCategory) => {
        /**
         * ItemCategory is the updated itemCategory (if the user pressed Save - otherwise it's null)
         */
        if (itemCategory) {
          this.spService._itemCategoryService
            .updateItemCategory(itemCategory.id, itemCategory)
            .subscribe(
              (response) => {
                this.getAllItemCategories();
                this.snackbar.open('Update Successful', 'x', {
                  duration: 3000,
                  panelClass: 'notif-success',
                });
              },
              (error) => {
                this.snackbar.open('Update Failed', 'x', {
                  duration: 3000,
                  panelClass: 'notif-error',
                });
              }
            );
        }
      });
  }

  deleteItemCategory(itemCategory) {
    this.spService._itemCategoryService
      .deleteItemCategory(itemCategory.id)
      .subscribe((response) => {
        this.getAllItemCategories();
        this.snackbar.open('Deletion Successful', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      });
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  confirmDialog(itemCategory): void {
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
          this.deleteItemCategory(itemCategory);
        }
      });
  }

  ngOnDestroy() {}
}
