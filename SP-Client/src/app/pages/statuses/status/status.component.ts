import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { Status } from '@app/_models/status';
import { StatusType } from '@app/_models/statusType';
import { SpService } from '@app/_services/sp.service';
import { fadeInRightAnimation } from 'src/@sp/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sp/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sp/shared/list/list-column.model';
import { StatusTypeService } from '../status-type/status-type.service';
import { StatusCreateUpdateComponent } from './status-create-update/status-create-update.component';
import { StatusService } from './status.service';

@Component({
  selector: 'sp-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class StatusComponent implements OnInit, OnDestroy {
  statuses: Status[];
  displayStatuses: Status[];
  statusTypes: StatusType[];
  selectedStatusTypeId: any | 0;

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    {
      name: 'Status Type',
      property: 'statusTypeName',
      visible: true,
      isModelProperty: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<Status> | null;

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
  getAllStatusTypes() {
    this.spService._statusTypeService
      .getAllStatusTypes()
      .subscribe((response) => {
        if (response) {
          this.statusTypes = response;
        }
      });
  }

  getAllStatuses() {
    this.spService._statusService.getAllStatuses().subscribe((response) => {
      if (response) {
        this.statuses = response;
        this.displayStatuses = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.displayStatuses;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit() {
    this.getAllStatusTypes();
    this.getAllStatuses();
  }

  createStatus() {
    const dialogData = { statusTypes: this.statusTypes };
    this.dialog
      .open(StatusCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe((status: Status) => {
        /**
         * Status is the updated status (if the user pressed Save - otherwise it's null)
         */
        if (status) {
          this.spService._statusService
            .createStatus(status)
            .subscribe((response) => {
              this.getAllStatuses();
              this.snackbar.open('Creation Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
          this.statuses.unshift(new Status(status));
        }
      });
  }

  updateStatus(status) {
    const dialogData = { statusTypes: this.statusTypes, status: status };
    this.dialog
      .open(StatusCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((status) => {
        /**
         * Status is the updated status (if the user pressed Save - otherwise it's null)
         */
        if (status) {
          this.spService._statusService
            .updateStatus(status.id, status)
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

  deleteStatus(status) {
    this.spService._statusService
      .deleteStatus(status.id)
      .subscribe((response) => {
        this.getAllStatuses();
        this.snackbar.open('Deletion Successful', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      });
  }

  filterByStatusTypeId() {
    if (this.selectedStatusTypeId > 0) {
      this.displayStatuses = this.statuses.filter(
        (x) => x.statusTypeId === this.selectedStatusTypeId
      );
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayStatuses;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.displayStatuses = this.statuses;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayStatuses;

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

  confirmDialog(status): void {
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
          this.deleteStatus(status);
        }
      });
  }

  ngOnDestroy() {}
}
