import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { StatusType } from '@app/_models/statusType';
import { SpService } from '@app/_services/sp.service';
import { fadeInRightAnimation } from 'src/@sp/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sp/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sp/shared/list/list-column.model';
import { StatusTypeCreateUpdateComponent } from './status-type-create-update/status-type-create-update.component';
import { StatusTypeService } from './status-type.service';

@Component({
  selector: 'sp-status-type',
  templateUrl: './status-type.component.html',
  styleUrls: ['./status-type.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class StatusTypeComponent implements OnInit, OnDestroy {
  statusTypes: StatusType[];

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<StatusType> | null;

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
  getAllStatuses() {
    this.spService._statusTypeService
      .getAllStatusTypes()
      .subscribe((response) => {
        if (response) {
          this.statusTypes = response;
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.statusTypes;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  ngOnInit() {
    this.getAllStatuses();
  }

  createStatusType() {
    this.dialog
      .open(StatusTypeCreateUpdateComponent)
      .afterClosed()
      .subscribe((statusType: StatusType) => {
        /**
         * Status is the updated status (if the user pressed Save - otherwise it's null)
         */
        if (statusType) {
          this.spService._statusTypeService
            .createStatusType(statusType)
            .subscribe((response) => {
              this.getAllStatuses();
              this.snackbar.open('Creation Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
          this.statusTypes.unshift(new StatusType(statusType));
        }
      });
  }

  updateStatusType(statusType) {
    this.dialog
      .open(StatusTypeCreateUpdateComponent, {
        data: statusType,
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((statusType) => {
        /**
         * Status is the updated status (if the user pressed Save - otherwise it's null)
         */
        if (statusType) {
          this.spService._statusTypeService
            .updateStatusType(statusType.id, statusType)
            .subscribe((response) => {
              this.getAllStatuses();
              this.snackbar.open('Update Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
        }
      });
  }

  deleteStatusType(statusType) {
    this.spService._statusTypeService
      .deleteStatusType(statusType.id)
      .subscribe((response) => {
        this.getAllStatuses();
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

  confirmDialog(statusType): void {
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
          this.deleteStatusType(statusType);
        }
      });
  }

  ngOnDestroy() {}
}
