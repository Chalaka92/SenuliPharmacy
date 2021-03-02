import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidenavItem } from './sidenav-item/sidenav-item.interface';
import { SidenavService } from './sidenav.service';
import { ThemeService } from '../../../@sp/services/theme.service';
import { AuthService } from '@app/_services/auth.service';

@Component({
  selector: 'sp-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  username = '';
  sidenavUserVisible$ = this.themeService.config$.pipe(
    map((config) => config.sidenavUserVisible)
  );

  @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  @Input()
  @HostBinding('class.expanded')
  expanded: boolean;

  items$: Observable<SidenavItem[]>;

  constructor(
    private router: Router,
    private sidenavService: SidenavService,
    private themeService: ThemeService,
    private authenticationService: AuthService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.username = this.authenticationService.currentUserValue.displayName;
    }
  }

  ngOnInit() {
    this.items$ = this.sidenavService.items$.pipe(
      map((items: SidenavItem[]) =>
        this.sidenavService.sortRecursive(items, 'position')
      )
    );
  }

  toggleCollapsed() {
    this.sidenavService.toggleCollapsed();
  }

  @HostListener('mouseenter')
  @HostListener('touchenter')
  onMouseEnter() {
    this.sidenavService.setExpanded(true);
  }

  @HostListener('mouseleave')
  @HostListener('touchleave')
  onMouseLeave() {
    this.sidenavService.setExpanded(false);
  }

  ngOnDestroy() {}
}
