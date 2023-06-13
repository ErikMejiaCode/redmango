import { shoppingCartInterface } from "../../../Interfaces";
import { SD_Status } from "../../../Utility/SD";

export interface orderSummaryProps {
  data: {
    id?: number;
    cartItems?: shoppingCartInterface[];
    cartTotal?: number;
    userId?: string;
    stripePaymentIntentId?: string;
    status?: SD_Status;
  };
  userInput: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
}

export default orderSummaryProps;
