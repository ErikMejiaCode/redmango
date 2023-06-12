import menuItemInterface from "./menuItemInterface";

export default interface orderDetails {
  orderDetailId?: number;
  orderHeaderId?: number;
  MenuItemId?: number;
  menuItem?: menuItemInterface;
  quantity?: number;
  itemName?: string;
  price?: number;
}
