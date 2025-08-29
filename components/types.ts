export interface ItemData {
  [key: string]: string;
}

export interface ChildCategory {
  records: Item[];
}

export interface Children {
  [category: string]: ChildCategory;
}

export interface Item {
  data: ItemData;
  children: Children;
}
