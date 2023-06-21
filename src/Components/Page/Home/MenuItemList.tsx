import React from "react";
import { useEffect, useState } from "react";
import { menuItemInterface } from "../../../Interfaces";
import { useGetMenuItemsQuery } from "../../../apis/manuItemApi";
import MenuItemCard from "./MenuItemCard";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/MenuItemSlice";
import { MainLoader } from "../Common";
import { RootState } from "../../../Storage/Redux/store";

function MenuItemList() {
  const [menuItems, setMenuItems] = useState<menuItemInterface[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);

  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(searchValue);
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);
    }
  }, [isLoading]);

  const handleFilters = (search: string) => {
    let tempMenuItems = [...data.result];

    //Search functionality
    if (search) {
      const tempSearchMenuItems = [...tempMenuItems];
      tempMenuItems = tempSearchMenuItems.filter((item: menuItemInterface) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    return tempMenuItems;
  };

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
      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemInterface, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList;
