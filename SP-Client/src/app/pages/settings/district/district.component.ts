import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmDialogComponent } from "@app/common/confirm-dialog/confirm-dialog.component";
import { District } from "@app/_models/district";
import { Province } from "@app/_models/province";
import { SpService } from "@app/_services/sp.service";
import { fadeInRightAnimation } from "src/@sp/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "src/@sp/animations/fade-in-up.animation";
import { ListColumn } from "src/@sp/shared/list/list-column.model";
import { ProvinceService } from "../province/province.service";
import { DistrictCreateUpdateComponent } from "./district-create-update/district-create-update.component";

@Component({
  selector: "sp-district",
  templateUrl: "./district.component.html",
  styleUrls: ["./district.component.scss"],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class DistrictComponent implements OnInit, OnDestroy {
  districts: District[];
  displayDistricts: District[];
  provinces: Province[];
  selectedProvinceId: any | 0;
  recordCount = 0;

  @Input()
  columns: ListColumn[] = [
    { name: "#Seq", property: "index", visible: true },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Name", property: "name", visible: true, isModelProperty: true },
    {
      name: "Province",
      property: "provinceName",
      visible: true,
      isModelProperty: true,
    },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<District> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private spService: SpService,
    private provinceService: ProvinceService,
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
    this.provinceService.getAllProvinces().subscribe((response) => {
      if (response) {
        this.provinces = response;
      }
    });
  }

  getAllDistricts(limit: number, offset: number) {
    this.spService._districtService
      .getAllDistrictsByPagination(limit, offset)
      .subscribe((response) => {
        if (response) {
          this.districts = response.districts;
          this.displayDistricts = response.districts;
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.displayDistricts;

          this.dataSource.sort = this.sort;

          this.recordCount = response.recordCount;
        }
      });
  }

  loadDataSourceByPage() {
    this.getAllDistricts(
      this.paginator.pageSize,
      this.paginator.pageIndex * this.paginator.pageSize
    );
  }

  ngOnInit() {
    this.getAllProvinces();
    this.getAllDistricts(10, 0);
  }

  createDistrict() {
    const dialogData = { provinces: this.provinces };
    this.dialog
      .open(DistrictCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe((district: District) => {
        /**
         * District is the updated district (if the user pressed Save - otherwise it's null)
         */
        if (district) {
          this.spService._districtService
            .createDistrict(district)
            .subscribe(() => {
              this.getAllDistricts(10, 0);
              this.snackbar.open("Creation Successful", "x", {
                duration: 3000,
                panelClass: "notif-success",
              });
            });
          this.districts.unshift(new District(district));
        }
      });
  }

  updateDistrict(district: any) {
    const dialogData = { provinces: this.provinces, district: district };
    this.dialog
      .open(DistrictCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((district) => {
        /**
         * District is the updated district (if the user pressed Save - otherwise it's null)
         */
        if (district) {
          this.spService._districtService
            .updateDistrict(district.id, district)
            .subscribe(() => {
              this.getAllDistricts(10, 0);
              this.snackbar.open("Update Successful", "x", {
                duration: 3000,
                panelClass: "notif-success",
              });
            });
        }
      });
  }

  deleteDistrict(district: { id: number }) {
    this.spService._districtService
      .deleteDistrict(district.id)
      .subscribe(() => {
        this.getAllDistricts(10, 0);
        this.snackbar.open("Deletion Successful", "x", {
          duration: 3000,
          panelClass: "notif-success",
        });
      });
  }

  filterByProvinceId() {
    if (this.selectedProvinceId > 0) {
      this.spService._districtService
        .getDistrictsByProvinceId(this.selectedProvinceId)
        .subscribe((response) => {
          this.displayDistricts = response;
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.displayDistricts;

          this.dataSource.sort = this.sort;
          this.recordCount = response.length;
        });
    } else {
      this.getAllDistricts(10, 0);
    }
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  confirmDialog(district: any): void {
    const message = `Are you sure you want to delete this?`;

    const dialogData = {
      icon: "delete",
      title: "Delete",
      message: message,
      icolor: "warn",
    };

    this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.deleteDistrict(district);
        }
      });
  }

  ngOnDestroy() {}
}
