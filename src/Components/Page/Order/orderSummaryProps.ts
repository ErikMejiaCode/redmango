import { shoppingCartInterface } from "../../../Interfaces";

export interface orderSummaryProps {
  data: {
    id: number;
    cartItems: shoppingCartInterface[];
    cartTotal: number;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}

export default orderSummaryProps;
