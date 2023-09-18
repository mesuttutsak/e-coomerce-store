export type BasketItem = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  count: number;
  stock: number;
}
export type BasketList = BasketItem[]

export type AppState = {
  products: object[];
  basket: BasketList;
  filteredProducts: object[];
  categories: string[];
  brands: string[];
  minMaxPrice: {min: number, max: number};
  productLength: number | null;
  searchText: string;
  filterOptions: {
    categories: string[];
    brands: string[];
    minMaxPrice: {min: number, max: number};
  } | null
};

const initialState : AppState = {
  products: [],
  basket: [],
  filteredProducts: [],
  categories: [],
  brands: [],
  minMaxPrice: {min: 0, max:0},
  filterOptions: null,
  productLength: null,
  searchText: ''
};

export const reducer = (state : AppState = initialState, action:any) => {
  switch (action.type) {
    case "setProducts": {
      return { ...state, products: action.payload };
    }
    case "setBasket": {
      return { ...state, basket: action.payload };
    }
    
    case "setFilteredProducts": {
      return { ...state, filteredProducts: action.payload };
    }
    
    case "setFilterOptions": {
      return { ...state, filterOptions: action.payload };
    }
    case "setProductLength": {
      return { ...state, productLength: action.payload };
    }
    case "setSearchText": {
      return { ...state, searchText: action.payload };
    }
    default:
      return state;
  }
};
