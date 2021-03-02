export class Status {
  id: number;
  name: string;
  statusTypeName: string;
  statusTypeId: number;

  constructor(status) {
    this.id = status.id;
    this.name = status.name;
    this.statusTypeId = status.statusTypeId;
  }
}
