import menuItemInterface from "./menuItemInterface";

export default interface cartItemInterface {
  id?: number;
  manuItemId?: number;
  menuItem?: menuItemInterface;
  quantity?: number;
}
