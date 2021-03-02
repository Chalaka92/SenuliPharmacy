import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { AuthGuard } from "./_helpers/auth.guard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "apps/dashboard",
        loadChildren: () =>
          import("./pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "users",
        loadChildren: () =>
          import("./pages/users/users.module").then((m) => m.UsersModule),
        canActivate: [AuthGuard],
      },
      {
        path: "userregistration",
        loadChildren: () =>
          import("./pages/user-registration/user-registration.module").then(
            (m) => m.UserRegistrationModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "statuses/status",
        loadChildren: () =>
          import("./pages/statuses/status/status.module").then(
            (m) => m.StatusModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "statuses/statustype",
        loadChildren: () =>
          import("./pages/statuses/status-type/status-type.module").then(
            (m) => m.StatusTypeModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "items/item",
        loadChildren: () =>
          import("./pages/items/item/item.module").then((m) => m.ItemModule),
        canActivate: [AuthGuard],
      },
      {
        path: "items/itemcategory",
        loadChildren: () =>
          import("./pages/items/item-category/item-category.module").then(
            (m) => m.ItemCategoryModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "items/itembatch",
        loadChildren: () =>
          import("./pages/items/item-batch/item-batch.module").then(
            (m) => m.ItemBatchModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "orders/order",
        loadChildren: () =>
          import("./pages/orders/order/order.module").then(
            (m) => m.OrderModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "orders/orderitembatch",
        loadChildren: () =>
          import(
            "./pages/orders/order-item-batch/order-item-batch.module"
          ).then((m) => m.OrderItemBatchModule),
        canActivate: [AuthGuard],
      },
      {
        path: "settings/province",
        loadChildren: () =>
          import("./pages/settings/province/province.module").then(
            (m) => m.ProvinceModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "settings/district",
        loadChildren: () =>
          import("./pages/settings/district/district.module").then(
            (m) => m.DistrictModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "reports/reorder",
        loadChildren: () =>
          import("./pages/reports/reorder/reorder.module").then(
            (m) => m.ReorderModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled",
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
