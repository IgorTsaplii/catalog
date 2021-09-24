import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import ProductsList from "./components/ProductsList/ProductsList";
import RemoveProductBlock from "./components/RemoveProductBlock/RemoveProductBlock";
import Modal from "./components/UI/Modal/Modal";
import AddProductBlock from "./components/AddProductBlock/AddProductBlock";
import EditProductBlock from "./components/EditProductBlock/EditProductBlock";
import { Redirect, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { initializedSuccss, setUserEmail } from "./redux/auth-reducer";
import Preloader from "./components/Preloader/Preloader";

function App(props) {
  const isOpenRemoveBlock = useSelector(
    (state) => state.catalog.isOpenRemoveBlock
  );
  const userEmail = useSelector((state) => state.auth.userEmail);
  const initialized = useSelector((state) => state.auth.initialized);
  const dispatch = useDispatch();

  const getUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserEmail(user.email))
        dispatch(initializedSuccss());
      } else {
        dispatch(initializedSuccss());
      }
    });
  };

  getUser();

  if (!initialized) {
    return <Preloader />;
  }

  if (!userEmail) {
    return <LoginPage />;
  } else {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route path="/" render={() => <Redirect to={"/catalog"} />} />
          <Route path="/catalog" render={() => <ProductsList />} />
          <Route path="/add-product" render={() => <AddProductBlock />} />
          <Route path="/edit-product" render={() => <EditProductBlock />} />
          {isOpenRemoveBlock ? (
            <Modal>
              <RemoveProductBlock />
            </Modal>
          ) : null}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
