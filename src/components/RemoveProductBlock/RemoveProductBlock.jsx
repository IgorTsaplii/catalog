import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeRemoveProductBlock,
  getProducts,
  removeCurrentProduct,
} from "../../redux/catalog-reducer";
import CustomButton from "../UI/CustomButton/CustomButton";

const RemoveProductBlock = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.catalog.currentProduct);

  const removeProduct = () => {
    dispatch(removeCurrentProduct(product.id));
    dispatch(closeRemoveProductBlock(true));
    dispatch(getProducts());
  };

  const closeRemoveBlock = () => {
    dispatch(closeRemoveProductBlock(true));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ paddingBottom: "20px" }}>
        Вы действительно хотите удалить <span>{product.name}</span> из каталога
        товаров
      </p>
      <CustomButton onClick={removeProduct}>Да</CustomButton>
      <CustomButton onClick={closeRemoveBlock} style={{ marginLeft: "20px" }}>
        Нет
      </CustomButton>
    </div>
  );
};

export default RemoveProductBlock;
