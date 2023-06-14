import React from "react";
import { withAdminAuth } from "../../HOC";
import { useGetAllOrdersQuery } from "../../apis/orderApi";
import OrderList from "../../Components/Page/Order/OrderList";
import { MainLoader } from "../../Components/Page/Common";

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data.result} />
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);
