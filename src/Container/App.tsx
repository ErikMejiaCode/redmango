import React, { useState } from "react";
import { Footer, Header } from "../Components/Layout";
import {
  AccessDenied,
  AllOrders,
  AuthenticationTest,
  AuthenticationTestAdmin,
  Home,
  MenuItemDetails,
  MenuItemUpsert,
  MyOrders,
  NotFound,
  OrderConfirmed,
  OrderDetails,
  Payment,
  ShoppingCart,
} from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/ShoppingCartSlice";
import Login from "../Components/Page/Login";
import Register from "../Components/Page/Register";
import jwt_Decode from "jwt-decode";
import { userInterface } from "../Interfaces";
import { setLoggedInUser } from "../Storage/Redux/UserAuthSlice";
import { RootState } from "../Storage/Redux/store";
import MenuItemList from "../Pages/MenuItem/MenuItemList";

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData = useSelector((state: RootState) => state.userAuthStore);

  const { data, isLoading } = useGetShoppingCartQuery(userData.id, {
    skip: skip,
  });

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userInterface =
        jwt_Decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data && data.result) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  useEffect(() => {
    if (userData.id) setSkip(false);
  }, [userData]);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          ></Route>
          <Route path="/shoppingcart" element={<ShoppingCart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/accessDenied" element={<AccessDenied />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route
            path="order/orderconfirmed/:id"
            element={<OrderConfirmed />}
          ></Route>
          <Route path="/order/myOrders" element={<MyOrders />}></Route>
          <Route path="/order/allOrders" element={<AllOrders />}></Route>
          <Route
            path="/menuitem/menuitemlist"
            element={<MenuItemList />}
          ></Route>
          <Route
            path="/menuitem/menuitemupsert/:id"
            element={<MenuItemUpsert />}
          ></Route>
          <Route
            path="/menuitem/menuitemupsert"
            element={<MenuItemUpsert />}
          ></Route>
          <Route
            path="/order/orderDetails/:id"
            element={<OrderDetails />}
          ></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
