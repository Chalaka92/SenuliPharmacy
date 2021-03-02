import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '@app/_models/role';
import { environment } from '@environments/environment';
import { UsersService } from '@app/pages/users/users.service';
import { StatusService } from '@app/pages/statuses/status/status.service';
import { StatusTypeService } from '@app/pages/statuses/status-type/status-type.service';
import { ItemCategoryService } from '@app/pages/Items/item-category/item-category.service';
import { ItemService } from '@app/pages/Items/item/item.service';
import { ItemBatchService } from '@app/pages/Items/item-batch/item-batch.service';
import { OrderItemBatchService } from '@app/pages/orders/order-item-batch/order-item-batch.service';
import { OrderService } from '@app/pages/orders/order/order.service';
import { Observable } from 'rxjs';
import { ProvinceService } from '@app/pages/settings/province/province.service';
import { DistrictService } from '@app/pages/settings/district/district.service';

@Injectable({ providedIn: 'root' })
export class SpService {
  _provinceService: ProvinceService;
  _districtService: DistrictService;
  _userService: UsersService;
  _itemCategoryService: ItemCategoryService;
  _itemService: ItemService;
  _statusService: StatusService;
  _statusTypeService: StatusTypeService;
  _itemBatchService: ItemBatchService;
  _orderItemBatchService: OrderItemBatchService;
  _orderService: OrderService;

  constructor(
    private http: HttpClient,
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private userService: UsersService,
    private itemCategoryService: ItemCategoryService,
    private itemService: ItemService,
    private statusService: StatusService,
    private statusTypeService: StatusTypeService,
    private itemBatchService: ItemBatchService,
    private orderService: OrderService,
    private orderItemBatchService: OrderItemBatchService
  ) {
    this._provinceService = provinceService;
    this._districtService = districtService;
    this._userService = userService;
    this._itemCategoryService = itemCategoryService;
    this._itemService = itemService;
    this._statusService = statusService;
    this._statusTypeService = statusTypeService;
    this._itemBatchService = itemBatchService;
    this._orderService = orderService;
    this._orderItemBatchService = orderItemBatchService;
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.apiUrl}/user/getuserroles`);
  }
}
