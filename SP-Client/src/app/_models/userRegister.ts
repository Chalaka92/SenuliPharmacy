export class UserRegister {
  password: string;
  username: string;
  displayName: string;
  email: string;
  roleId: number;
  userId: number;

  constructor(userRegister) {
    this.password = userRegister.password;
    this.username = userRegister.username;
    this.displayName = userRegister.displayName;
    this.email = userRegister.email;
    this.roleId = userRegister.roleId;
    this.userId = userRegister.userId;
  }
}
