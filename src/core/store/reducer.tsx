export type AppState = {
  products: object[];
  categories: string[];
  productLength: number | null;
  searchText: string;
};

const initialState : AppState = {
  products: [],
  categories: [],
  productLength: null,
  searchText: ''
};

export const reducer = (state : AppState = initialState, action:any) => {
  switch (action.type) {
    case "setProducts": {
      return { ...state, products: action.payload };
    }
    case "setCategories": {
      return { ...state, categories: action.payload };
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
