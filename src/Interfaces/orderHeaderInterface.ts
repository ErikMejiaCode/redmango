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
  status?: string;
  totalItems?: number;
  orderDetails?: orderDetails[];
}
