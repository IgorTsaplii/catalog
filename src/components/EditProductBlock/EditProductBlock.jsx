import React, { useEffect, useState } from "react";
import CustomButton from "../UI/CustomButton/CustomButton";
import classes from "./EditProductBlock.module.css";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router";
import productPhoto from "../../assets/images/product.png";
import { getProducts, updateCurrentProduct } from "../../redux/catalog-reducer";

const EditProductBlock = () => {
  const currentProduct = useSelector((state) => state.catalog.currentProduct);
  const [image, setImage] = useState("");
  const [closePage, setClosePage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentProduct) {
      setImage(currentProduct.photo);
    }
  }, []);

  const setImageProduct = (file) => {
    if (file) {
      if (file.type.indexOf("image") === 0) {
        const reader = new FileReader();
        reader.onload = (event) => setImage(event.target.result);
        reader.readAsDataURL(file);
      }
    }
  };

  function saveProduct(values) {
    dispatch(
      updateCurrentProduct(
        currentProduct.id,
        values.name,
        image,
        values.description,
        values.price,
        values.discount,
        values.discountEndDate
      )
    );

    setClosePage(true);
    dispatch(getProducts());
  }
  const validationsSchema = yup.object().shape({
    name: yup
      .string()
      .required("Обязательное поле")
      .test(
        "len",
        "От 20 до 60 символов",
        (value) => value && value.length >= 20 && value.length <= 60
      ),
    description: yup
      .string()
      .test("len", "До 200 символов", (value) =>
        value ? value && value.length <= 200 : true
      ),
    price: yup
      .number()
      .typeError("Только числа")
      .required("Обязательное поле")
      .test("pos", "Только положительное число", (value) => value > 0)
      .test(
        "maxVal",
        "Максимальное значение 99999999.99$",
        (value) => value <= 99999999.99
      ),
    discount: yup
      .number()
      .typeError("Только числа")
      .test("integer", "Только целое число", (value) =>
        value ? Number.isInteger(value) : true
      )
      .test("pos", "Только положительное число", (value) =>
        value ? value > 0 : true
      )
      .test("maxVal", " От 10 до 90 ", (value) =>
        value ? value >= 10 && value <= 90 : true
      ),
    discountEndDate: yup
      .string()
      .when("discount", {
        is: (discount) => discount,
        then: yup.string().required("Укажите дату окончания скидки"),
      })
      .test("date", "Дата должна быть больше текущей даты", (value) =>
        value ? new Date(value) > new Date() : true
      ),
  });

  if (!currentProduct || closePage) {
    return <Redirect to="/catalog" />;
  } else {
    return (
      <div className={classes.wrapper}>
        <h2>Изменить товар</h2>
        <NavLink className={classes.exit_button} to="/catalog">
          Закрыть
        </NavLink>
        <div>
          <Formik
            initialValues={{
              name: currentProduct.name,
              photo: currentProduct.photo,
              description: currentProduct.description,
              price: currentProduct.price,
              discount: currentProduct.discount,
              discountEndDate: currentProduct.discountEndDate,
            }}
            validateOnBlur
            onSubmit={(values) => saveProduct(values)}
            validationSchema={validationsSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
              dirty,
            }) => (
              <div className={classes.form}>
                <label>
                  Название товара
                  <input
                    className={classes.field}
                    name="name"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Название товара"
                  />
                  {touched.name && errors.name && (
                    <p className={classes.error}>{errors.name}</p>
                  )}
                </label>
                <img
                  src={image ? image : productPhoto}
                  className={classes.product_img}
                  alt="Фото продукта"
                />
                <label>
                  Фото товара
                  <div className={classes.product_img_input}>
                    Добавить фото
                    <input
                      className={classes.field}
                      name="photo"
                      type="file"
                      onChange={(event) =>
                        setImageProduct(event.target.files[0])
                      }
                      onBlur={handleBlur}
                    />
                  </div>
                  {touched.photo && errors.photo && (
                    <p className={classes.error}>{errors.photo}</p>
                  )}
                </label>
                <label>
                  Описание товара
                  <input
                    className={classes.field}
                    name="description"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder="Описание товара"
                  />
                  {touched.description && errors.description && (
                    <p className={classes.error}>{errors.description}</p>
                  )}
                </label>
                <label>
                  Цена товара
                  <input
                    className={classes.field}
                    name="price"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    placeholder="Цена товара $"
                  />
                  {touched.price && errors.price && (
                    <p className={classes.error}>{errors.price}</p>
                  )}
                </label>
                <label>
                  Процент скидки
                  <input
                    className={classes.field}
                    name="discount"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.discount}
                    placeholder="Процент скидки %"
                  />
                  {touched.discount && errors.discount && (
                    <p className={classes.error}>{errors.discount}</p>
                  )}
                </label>
                <label>
                  Дата окончания скидки
                  <input
                    className={classes.field}
                    name="discountEndDate"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.discountEndDate}
                  />
                  {touched.discountEndDate && errors.discountEndDate && (
                    <p className={classes.error}>{errors.discountEndDate}</p>
                  )}
                </label>
                <CustomButton
                  disabled={!isValid && !dirty}
                  onClick={handleSubmit}
                  type="submit"
                >
                  Изменить товар
                </CustomButton>
              </div>
            )}
          </Formik>
        </div>
      </div>
    );
  }
};

export default EditProductBlock;
