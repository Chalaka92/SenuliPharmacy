export class Item {
  id: number;
  categoryId: number;
  name: string;
  itemCode: string;
  comment: string;
  categoryName: string;
  isNew: boolean;

  constructor(item) {
    this.id = item.id;
    this.name = item.name;
    this.itemCode = item.itemCode;
    this.comment = item.comment;
    this.isNew = item.isNew;
    this.categoryId = item.categoryId;
    this.categoryName = item.categoryName;
  }
}
