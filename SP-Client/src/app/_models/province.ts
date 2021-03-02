import { District } from './district';

export class Province {
  id: number;
  name: string;
  districts: District[];

  constructor(province) {
    this.id = province.id;
    this.name = province.name;
    this.districts = province.districts;
  }
}
