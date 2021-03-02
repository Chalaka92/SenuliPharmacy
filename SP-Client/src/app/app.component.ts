import { DOCUMENT } from "@angular/common";
import { Component, Inject, Renderer2 } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { ThemeService } from "../@sp/services/theme.service";
import { ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";
import { Platform } from "@angular/cdk/platform";
import { User } from "./_models/user";
import { AuthService } from "./_services/auth.service";
import { SidenavService } from "./layout/sidenav/sidenav.service";
import { SplashScreenService } from "src/@sp/services/splash-screen.service";

@Component({
  selector: "sp-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  currentUser: User;

  constructor(
    private iconRegistry: MatIconRegistry,
    private renderer: Renderer2,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private platform: Platform,
    private route: ActivatedRoute,
    private authenticationService: AuthService,
    private sidenavService: SidenavService,
    private splashScreen: SplashScreenService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("style")))
      .subscribe((queryParamMap) =>
        this.themeService.setStyle(queryParamMap.get("style"))
      );

    this.iconRegistry.setDefaultFontSetClass("material-icons-outlined");
    this.themeService.theme$.subscribe((theme) => {
      if (theme[0]) {
        this.renderer.removeClass(this.document.body, theme[0]);
      }

      this.renderer.addClass(this.document.body, theme[1]);
    });

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, "is-blink");
    }
    this.addNavItems();
  }

  addNavItems() {
    this.sidenavService.addItems([
      {
        name: "APPS",
        position: 5,
        type: "subheading",
        customClass: "first-subheading",
      },
      {
        name: "Dashboard",
        routeOrFunction: "/apps/dashboard",
        icon: "dashboard",
        position: 10,
        pathMatchExact: true,
      },
      {
        name: "Users",
        routeOrFunction: "/users",
        icon: "people",
        position: 15,
        pathMatchExact: true,
      },
      {
        name: "User Registration",
        routeOrFunction: "/userregistration",
        icon: "people",
        position: 20,
        pathMatchExact: true,
      },
      {
        name: "Statuses",
        icon: "pages",
        position: 30,
        subItems: [
          {
            name: "Status Type",
            routeOrFunction: "/statuses/statustype",
            position: 10,
          },
          {
            name: "Status",
            routeOrFunction: "/statuses/status",
            position: 15,
          },
        ],
      },
      {
        name: "Items",
        icon: "format_paint",
        position: 35,
        subItems: [
          {
            name: "Item Category",
            routeOrFunction: "/items/itemcategory",
            position: 10,
          },
          {
            name: "Item",
            routeOrFunction: "/items/item",
            position: 15,
          },
          {
            name: "Item Batch",
            routeOrFunction: "/items/itembatch",
            position: 20,
          },
        ],
      },
      {
        name: "Orders",
        icon: "shopping_cart",
        position: 55,
        subItems: [
          {
            name: "Order",
            routeOrFunction: "/orders/order",
            position: 10,
          },
          {
            name: "Order Item Batch",
            routeOrFunction: "/orders/orderitembatch",
            position: 15,
          },
        ],
      },
      {
        name: "Settings",
        icon: "shopping_cart",
        position: 55,
        subItems: [
          {
            name: "Province",
            routeOrFunction: "/settings/province",
            position: 10,
          },
          {
            name: "District",
            routeOrFunction: "/settings/district",
            position: 15,
          },
        ],
      },
      {
        name: "Reports",
        icon: "dock",
        position: 60,
        subItems: [
          {
            name: "Reorders",
            routeOrFunction: "/reports/reorder",
            position: 10,
          },
        ],
      },
    ]);
  }
}
