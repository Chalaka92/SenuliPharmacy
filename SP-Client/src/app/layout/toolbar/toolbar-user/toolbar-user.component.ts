import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'sp-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss'],
})
export class ToolbarUserComponent implements OnInit {
  @Output() openConfig = new EventEmitter();
  isOpen: boolean;
  username = '';

  constructor(private authService: AuthService) {
    if (this.authService.currentUserValue) {
      this.username = this.authService.currentUserValue.displayName;
    }
  }

  ngOnInit() {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logout() {
    this.authService.logout();
  }
}
