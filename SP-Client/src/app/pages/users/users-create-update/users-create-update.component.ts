import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { District } from "@app/_models/district";
import { Province } from "@app/_models/province";
import { Role } from "@app/_models/role";
import {
  UserAddress,
  UserContact,
  UserDetail,
  UserEmail,
} from "@app/_models/userDetails";
import { AuthService } from "@app/_services/auth.service";
import { SpService } from "@app/_services/sp.service";
import { Observable } from "rxjs";
import { fadeInRightAnimation } from "src/@sp/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "src/@sp/animations/fade-in-up.animation";

@Component({
  selector: "sp-users-create-update",
  templateUrl: "./users-create-update.component.html",
  styleUrls: ["./users-create-update.component.scss"],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class UsersCreateUpdateComponent implements OnInit {
  form: FormGroup;

  mode: "create" | "update" = "create";
  roles: Role[];
  defaults: UserDetail;
  userId: number;
  provinces: Province[];
  districts: District[];
  fdistricts: District[];
  selectedProvince: Province;

  private _gap = 16;
  gap = `${this._gap}px`;
  filteredOptions: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private spService: SpService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getAllRoles();
    this.getAllProvinces();
    this.getAllDistricts();

    this.activatedRoute.params.subscribe((params) => {
      this.userId = params["userId"];
      if (this.userId) {
        this.getSingleUserDetails(this.userId);
        this.mode = "update";
      } else {
        this.defaults = {} as UserDetail;

        this.defaults.userEmails = [] as UserEmail[];
        this.defaults.userEmails.push({} as UserEmail);

        this.defaults.userContacts = [] as UserContact[];
        this.defaults.userContacts.push({} as UserContact);

        this.defaults.userAddresses = [] as UserAddress[];
        this.defaults.userAddresses.push({} as UserAddress);

        this.buildForm();
      }
    });
  }

  buildForm() {
    // create a form group for each item in the model
    const addressFormGroups = this.defaults.userAddresses.map((x) =>
      this.fb.group({
        id: this.fb.control(x.id || 0),
        address1: this.fb.control(x.address1),
        address2: this.fb.control(x.address2),
        address3: this.fb.control(x.address3),
        districtId: this.fb.control(x.districtId || 0),
        provinceId: this.fb.control(x.provinceId || 0),
        locationLatitude: this.fb.control(x.locationLatitude),
        locationLongitude: this.fb.control(x.locationLongitude),
      })
    );
    const emailFormGroups = this.defaults.userEmails.map((x) =>
      this.fb.group({
        id: this.fb.control(x.id || 0),
        email: this.fb.control(x.email),
      })
    );
    const contactFormGroups = this.defaults.userContacts.map((x) =>
      this.fb.group({
        id: this.fb.control(x.id || 0),
        contactNo: this.fb.control(x.contactNo),
      })
    );

    // create a form array for the groups
    const emailFormArray = this.fb.array(emailFormGroups);
    const contactFormArray = this.fb.array(contactFormGroups);
    const addressFormArray = this.fb.array(addressFormGroups);

    this.form = this.fb.group({
      roleId: [this.defaults.roleId || null],
      userCode: [this.defaults.userCode || null],
      firstName: [this.defaults.firstName || null],
      middleName: [this.defaults.middleName || null],
      lastName: [this.defaults.lastName || null],
      birthday: [this.defaults.birthday || null],
      nic: [this.defaults.nic || null],
      userEmails: emailFormArray,
      userContacts: contactFormArray,
      userAddresses: addressFormArray,
    });

    // this.form.get("userAddresses").valueChanges.subscribe((x) => {
    //   this.fdistricts = this._filter(x[0].districtId);
    // });
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${
      this._gap - this._gap / colAmount
    }px)`;
  }

  save() {
    if (this.mode === "create") {
      this.createUserDetail();
    } else if (this.mode === "update") {
      this.updateUserDetail();
    }
  }

  createUserDetail() {
    const userDetail: UserDetail = this.form.value;
    userDetail.createdDate = new Date();
    userDetail.loginEmail = this.authService.currentUserValue.email;

    if (userDetail) {
      this.spService._userService.createUserDetail(userDetail).subscribe(
        () => {
          this.snackbar.open("User Creation Successful", "x", {
            duration: 3000,
            panelClass: "notif-success",
          });
        },
        (error) => {
          console.log(error);
          this.snackbar.open("User Creation Failed", "x", {
            duration: 3000,
            panelClass: "notif-error",
          });
        }
      );
    }
  }

  updateUserDetail() {
    const userDetail: UserDetail = this.form.value;
    console.log(this.form.value.birthday);
    userDetail.id = this.userId;
    if (userDetail) {
      this.spService._userService
        .updateUserDetail(userDetail.id, userDetail)
        .subscribe(
          () => {
            this.snackbar.open("Update Successful", "x", {
              duration: 3000,
              panelClass: "notif-success",
            });
          },
          (error) => {
            console.log(error);
            this.snackbar.open("Update Failed", "x", {
              duration: 3000,
              panelClass: "notif-error",
            });
          }
        );
    }
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }

  getAllRoles() {
    this.spService.getAllRoles().subscribe((response) => {
      if (response) {
        this.roles = response;
      }
    });
  }

  getSingleUserDetails(userId: number) {
    this.spService._userService
      .getSingleUserDetails(userId)
      .subscribe((response) => {
        if (response) {
          this.defaults = response;
          this.buildForm();
        }
      });
  }

  getAllProvinces() {
    this.spService._provinceService.getAllProvinces().subscribe((response) => {
      if (response) {
        this.provinces = response;
      }
    });
  }

  getAllDistricts() {
    this.spService._districtService.getAllDistricts().subscribe((response) => {
      if (response) {
        this.districts = response;
        this.fdistricts = response;
      }
    });
  }

  AddEmail() {
    this.defaults.userEmails.push({} as UserEmail);
    (<FormArray>this.form.get("userEmails")).push(
      this.fb.group({ id: 0, email: null })
    );
  }

  RemoveEmail(id: number) {
    if (this.defaults.userEmails.length > 1) {
      this.defaults.userEmails.splice(id, 1);
    }

    if ((<FormArray>this.form.get("userEmails")).length > 1) {
      (<FormArray>this.form.get("userEmails")).removeAt(id);
    }
  }

  AddContact() {
    this.defaults.userContacts.push({} as UserContact);
    (<FormArray>this.form.get("userContacts")).push(
      this.fb.group({ id: 0, contactNo: null })
    );
  }

  RemoveContact(id: number) {
    if (this.defaults.userContacts.length > 1) {
      this.defaults.userContacts.splice(id, 1);
    }

    if ((<FormArray>this.form.get("userContacts")).length > 1) {
      (<FormArray>this.form.get("userContacts")).removeAt(id);
    }
  }

  setSelectedProvince(provinceId: any) {
    this.selectedProvince = this.provinces.filter(
      (x) => x.id === provinceId
    )[0];

    if (this.selectedProvince) {
      this.districts = this.selectedProvince.districts;
    }
    this.form.patchValue({ districtId: null });
  }

  // private _filter(value: string): any[] {
  //   const filterValue = value.toLowerCase();

  //   return this.districts.filter((option) =>
  //     option.name.toLowerCase().includes(filterValue)
  //   );
  // }
}
