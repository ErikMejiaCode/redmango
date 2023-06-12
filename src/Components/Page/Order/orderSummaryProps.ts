import { shoppingCartInterface } from "../../../Interfaces";

export interface orderSummaryProps {
  data: {
    id?: number;
    cartItems?: shoppingCartInterface[];
    cartTotal?: number;
    userId?: string;
    stripePaymentIntentId?: string;
    status?: string;
  };
  userInput: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
}

export default orderSummaryProps;
