import React from "react";
import { useEffect, useState } from "react";
import { menuItemInterface } from "../../../Interfaces";

function MenuItemList() {
  const [menuItems, setMenuItems] = useState<menuItemInterface[]>([]);

  useEffect(() => {
    fetch("https://localhost:7207/api/MenuItem")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMenuItems(data.result);
      });
  }, []);

  return <div>MenuItemList</div>;
}

export default MenuItemList;
