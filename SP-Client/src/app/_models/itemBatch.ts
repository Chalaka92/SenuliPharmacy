export interface IItemBatchEnvelope {
  itemBatches: ItemBatch[];
  recordCount: number;
}

export class ItemBatch {
  id: number;
  itemId: number;
  itemName: string;
  itemStatusId: number;
  itemStatusName: string;
  itemCount: number;
  stockCount: number;
  reorderCount: number;
  name: string;
  itemBatchCode: string;
  maxRetailPrice: number;
  manufactureDate: string;
  expiryDate: string;

  constructor(itemBatch) {
    this.id = itemBatch.id;
    this.itemId = itemBatch.itemId;
    this.itemName = itemBatch.itemName;
    this.itemStatusId = itemBatch.itemStatusId;
    this.itemStatusName = itemBatch.itemStatusName;
    this.itemCount = itemBatch.itemCount;
    this.stockCount = itemBatch.stockCount;
    this.reorderCount = itemBatch.reorderCount;
    this.name = itemBatch.name;
    this.itemBatchCode = itemBatch.itemBatchCode;
    this.maxRetailPrice = itemBatch.maxRetailPrice;
    this.manufactureDate = itemBatch.manufactureDate;
    this.expiryDate = itemBatch.expiryDate;
  }
}
