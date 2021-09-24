import React from "react";
import classes from "./ProductsListItem.module.css";
import productPhoto from "../../assets/images/product.png";
import {
  openRemoveProductBlock,
  setCurrentProduct,
} from "../../redux/catalog-reducer";
import { useDispatch } from "react-redux";
import CustomButton from "../UI/CustomButton/CustomButton";
import { NavLink } from "react-router-dom";

const ProductsListItem = ({
  name,
  description,
  discount,
  discountEndDate,
  photo,
  price,
  item,
}) => {
  const dispatch = useDispatch();
  const openEditBlock = () => {
    dispatch(setCurrentProduct(item));
  };

  const openRemoveBlock = () => {
    dispatch(openRemoveProductBlock(true));
    dispatch(setCurrentProduct(item));
  };

  const priceWithDiscount = (price, discountPercentage) => {
    const discount = (price / 100) * discountPercentage;
    return (price - discount).toFixed(2);
  };

  const daysToDiscountEnd = (discountEndDate) => {
    const nowDate =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      (new Date().getDate() + 1);
    const timeDiff = Math.abs(new Date(nowDate) - new Date(discountEndDate));
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  return (
    <div className={classes.products_list_item}>
      <img alt={name} src={photo ? photo : productPhoto} />
      <h3>{name}</h3>
      <p>
        Описание: <span>{description}</span>
      </p>
      <p>
        Цена: <span>{price}$</span>
      </p>
      {discount && new Date(discountEndDate) > new Date() ? (
        <p className={classes.discount_prise}>
          Цена со скидкой: <span>{priceWithDiscount(price, discount)}$</span>
        </p>
      ) : null}

      {discount && new Date(discountEndDate) > new Date() ? (
        <p>
          Дней до конца скидки:{" "}
          <span>{daysToDiscountEnd(discountEndDate)}</span>
        </p>
      ) : null}
      <div className={classes.button_block}>
        <NavLink to="/edit-product">
          <CustomButton style={{ marginRight: "10px" }} onClick={openEditBlock}>
            Изменить
          </CustomButton>
        </NavLink>
        <CustomButton onClick={openRemoveBlock}>Удалить</CustomButton>
      </div>
    </div>
  );
};

export default ProductsListItem;
