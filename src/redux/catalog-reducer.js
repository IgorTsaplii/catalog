import { productsAPI } from "../api/api";

const SET_PRODUCTS = "__catalog/products/SET_PRODUCTS";
const OPEN_REMOVE_PRODUCT_BLOCK =
  "__catalog/products/OPEN_REMOVE_PRODUCT_BLOCK";
const CLOSE_REMOVE_PRODUCT_BLOCK =
  "__catalog/products/CLOSE_REMOVE_PRODUCT_BLOCK";
const SET_CURRENT_PRODUCT = "__catalog/products/SET_CURRENT_PRODUCT";

let initialState = {
  products: [],
  currentProduct: null,
  isOpenRemoveBlock: false,
};

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };

    case OPEN_REMOVE_PRODUCT_BLOCK:
      return {
        ...state,
        isOpenRemoveBlock: true,
      };

    case CLOSE_REMOVE_PRODUCT_BLOCK:
      return {
        ...state,
        isOpenRemoveBlock: false,
      };

    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.currentProduct,
      };

    default:
      return state;
  }
};

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

export const setCurrentProduct = (currentProduct) => ({
  type: SET_CURRENT_PRODUCT,
  currentProduct,
});

export const openRemoveProductBlock = (isOpenRemoveBlock) => ({
  type: OPEN_REMOVE_PRODUCT_BLOCK,
  isOpenRemoveBlock,
});

export const closeRemoveProductBlock = (isOpenRemoveBlock) => ({
  type: CLOSE_REMOVE_PRODUCT_BLOCK,
  isOpenRemoveBlock,
});

export const getProducts = (invoices) => async (dispatch) => {
  const response = await productsAPI.getProducts(invoices);
  if (response.status < 400) {
    const keys = Object.keys(response.data);
    let productsArray = [];
    for (let key in response.data) {
      productsArray.push(response.data[key]);
    }
    for (let i = 0; i < productsArray.length; i++) {
      let newid = keys[i];
      productsArray[i].id = newid;
    }
    dispatch(setProducts(productsArray));
  }
};

export const saveNewProduct =
  (name, photo, description, price, discount, discountEndDate) =>
  async (dispatch) => {
    await productsAPI.saveNewProduct(
      name,
      photo,
      description,
      price,
      discount,
      discountEndDate
    );
  };

export const updateCurrentProduct =
  (id, name, photo, description, price, discount, discountEndDate) =>
  async (dispatch) => {
    await productsAPI.updateCurrentProduct(
      id,
      name,
      photo,
      description,
      price,
      discount,
      discountEndDate
    );
  };

export const removeCurrentProduct = (id) => async (dispatch) => {
  await productsAPI.removeCurrentProduct(id);
};

export default catalogReducer;
