import React from "react";
import { useEffect, useState } from "react";
import { menuItemInterface } from "../../../Interfaces";
import { useGetMenuItemsQuery } from "../../../apis/manuItemApi";
import MenuItemCard from "./MenuItemCard";
import { useDispatch } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/MenuItemSlice";
import { MainLoader } from "../Common";

function MenuItemList() {
  //const [menuItems, setMenuItems] = useState<menuItemInterface[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);

  useEffect(() => {
    if (!isLoading) {
      console.log(data.result);
      dispatch(setMenuItem(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <MainLoader />;
  }

  // useEffect(() => {
  //   fetch("https://localhost:7207/api/MenuItem")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setMenuItems(data.result);
  //     });
  // }, []);

  return (
    <div className="container row ">
      {data.result.length > 0 &&
        data.result.map((menuItem: menuItemInterface, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList;
