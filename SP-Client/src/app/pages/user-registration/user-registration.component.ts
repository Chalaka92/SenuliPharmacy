import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { UserDetail } from '@app/_models/userDetails';
import { UserRegister } from '@app/_models/userRegister';
import { SpService } from '@app/_services/sp.service';
import { request } from 'https';
import { error } from 'protractor';
import { fadeInRightAnimation } from 'src/@sp/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sp/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sp/shared/list/list-column.model';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'sp-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class UserRegistrationComponent implements OnInit, OnDestroy {
  userDetails: UserDetail[];

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    {
      name: 'Id',
      property: 'id',
      visible: false,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'First Name',
      property: 'firstName',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Middle Name',
      property: 'middleName',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Last Name',
      property: 'lastName',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Email',
      property: 'userEmails',
      visible: true,
      isModelProperty: true,
      isList: true,
    },
    {
      name: 'RoleName',
      property: 'roleName',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'NIC',
      property: 'nic',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Created By',
      property: 'createdBy',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<UserDetail> | null;

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
  getAllUserDetails() {
    this.spService._userService.getAllUserDetails().subscribe((response) => {
      if (response) {
        this.userDetails = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.userDetails;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit() {
    this.getAllUserDetails();
  }

  RegisterUserDetail(userDetail) {
    // tslint:disable-next-line: no-shadowed-variable
    const request = {} as UserRegister;

    request.displayName = userDetail.firstName + ' ' + userDetail.lastName;
    request.username = userDetail.firstName + userDetail.lastName;
    request.userId = userDetail.id;
    request.email = userDetail.userEmails[0].email;
    request.password = 'Pa$$w0rd';
    request.roleId = userDetail.roleId;

    this.spService._userService.RegisterUserDetail(request).subscribe(
      (response) => {
        this.getAllUserDetails();
        this.snackbar.open('Registration Successful', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      },
      (error) => {
        this.snackbar.open('Registration Failed.', 'x', {
          duration: 3000,
          panelClass: 'notif-error',
        });
      }
    );
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  confirmDialog(userDetail): void {
    const message = `Are you sure you want to register this user?`;

    const dialogData = { title: 'Confirm Action', message: message };

    this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.RegisterUserDetail(userDetail);
        }
      });
  }

  ngOnDestroy() {}
}
