type AppState = {
  products: object[];
  categories: string[];
  productLength: number | null;
};

const initialState : AppState = {
  products: [],
  categories: [],
  productLength: null
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
    default:
      return state;
  }
};
