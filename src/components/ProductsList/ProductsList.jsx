import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/catalog-reducer";
import ProductsListItem from "../ProductsListItem/ProductsListItem";
import classes from "./ProductsList.module.css";
import { NavLink } from "react-router-dom";

const ProductsList = () => {
  const products = useSelector((state) => state.catalog.products);
  const isOpenRemoveBlock = useSelector(
    (state) => state.catalog.isOpenRemoveBlock
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [isOpenRemoveBlock]);

  return (
    <div style={{ position: "relative" }}>
      <NavLink to="/add-product" className={classes.add_button}>
        Добавить товар
      </NavLink>
      <h2 style={{ textAlign: "center", margin: " 40px 0", fontSize: "28px" }}>
        Каталог товаров
      </h2>
      <div className={classes.product_list}>
        {products.map((item) => (
          <ProductsListItem
            item={item}
            id={item.id}
            key={item.id}
            name={item.name}
            photo={item.photo}
            description={item.description}
            price={item.price}
            discount={item.discount}
            discountEndDate={item.discountEndDate}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
