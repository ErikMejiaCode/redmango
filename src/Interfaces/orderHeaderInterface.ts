import { SD_Status } from "../Utility/SD";
import orderDetails from "./orderDetailInterface";

export default interface orderHeaderInterface {
  orderHeaderId?: number;
  pickupName?: string;
  pickupPhoneNumber?: string;
  pickupEmail?: string;
  applicationUserId?: string;
  user?: any;
  orderTotal?: number;
  orderDate?: Date;
  stripePaymentIntentId?: number;
  status?: SD_Status;
  totalItems?: number;
  orderDetails?: orderDetails[];
}
