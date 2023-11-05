export interface IOrdersFeedItemIngredientsData {
  image: string;
  name: string;
  hiddenIngredientsNumber: number | null;
}

export interface IOrderDetailsIngredientsData {
  image: string;
  name: string;
  price: number;
  count: number;
}

export type TOrderFeed = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export type TOrderDetailsData = {
  ingredientsInfo: Array<IOrderDetailsIngredientsData>;
  totalPrice: number;
};

export type TOrderFeedItemData = {
  ingredientsInfo: Array<IOrdersFeedItemIngredientsData>;
  totalPrice: number;
};

export type TOrdersFeed = {
  orders: Array<TOrderFeed>;
  success: boolean;
  total: number;
  totalToday: number;
};
