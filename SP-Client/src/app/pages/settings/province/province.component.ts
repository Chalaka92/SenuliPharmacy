import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { Province } from '@app/_models/province';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ListColumn } from 'src/@sp/shared/list/list-column.model';
import { ProvinceCreateUpdateComponent } from './province-create-update/province-create-update.component';
import { fadeInUpAnimation } from 'src/@sp/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@sp/animations/fade-in-right.animation';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpService } from '@app/_services/sp.service';

@Component({
  selector: 'sp-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class ProvinceComponent implements OnInit, OnDestroy {
  provinces: Province[];

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<Province> | null;

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
  getAllProvinces() {
    this.spService._provinceService.getAllProvinces().subscribe((response) => {
      if (response) {
        this.provinces = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.provinces;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit() {
    this.getAllProvinces();
  }

  createProvince() {
    this.dialog
      .open(ProvinceCreateUpdateComponent)
      .afterClosed()
      .subscribe((province: Province) => {
        /**
         * Province is the updated province (if the user pressed Save - otherwise it's null)
         */
        if (province) {
          this.spService._provinceService
            .createProvince(province)
            .subscribe(() => {
              this.getAllProvinces();
              this.snackbar.open('Creation Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
          this.provinces.unshift(new Province(province));
        }
      });
  }

  updateProvince(province) {
    this.dialog
      .open(ProvinceCreateUpdateComponent, {
        data: province,
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((province) => {
        /**
         * Province is the updated province (if the user pressed Save - otherwise it's null)
         */
        if (province) {
          this.spService._provinceService
            .updateProvince(province.id, province)
            .subscribe(() => {
              this.getAllProvinces();
              this.snackbar.open('Update Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
        }
      });
  }

  deleteProvince(province) {
    this.spService._provinceService
      .deleteProvince(province.id)
      .subscribe(() => {
        this.getAllProvinces();
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

  confirmDialog(province): void {
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
          this.deleteProvince(province);
        }
      });
  }

  ngOnDestroy() {}
}
