export class ItemCategory {
  id: number;
  name: string;
  itemCategoryCode: string;

  constructor(itemCategory) {
    this.id = itemCategory.id;
    this.name = itemCategory.name;
    this.itemCategoryCode = itemCategory.itemCategoryCode;
  }
}
