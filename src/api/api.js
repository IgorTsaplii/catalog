import * as axios from "axios";

export const productsAPI = {
  getProducts() {
    return axios.get(
      `https://catalog-react-74548-default-rtdb.firebaseio.com/products.json`
    );
  },

  saveNewProduct(
    name,
    photo,
    description,
    price,
    discount,
    discountEndDate
  ) {
    return axios.post(
      `https://catalog-react-74548-default-rtdb.firebaseio.com/products.json`,
      {
        name,
        photo,
        description,
        price,
        discount,
        discountEndDate,
      }
    );
  },

  updateCurrentProduct(
    id,
    name,
    photo,
    description,
    price,
    discount,
    discountEndDate
  ) {
    return axios.put(
      `https://catalog-react-74548-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        name,
        photo,
        description,
        price,
        discount,
        discountEndDate,
      }
    );
  },

  removeCurrentProduct(id) {
    return axios.delete(`https://catalog-react-74548-default-rtdb.firebaseio.com/products/${id}.json`);
  },
};
