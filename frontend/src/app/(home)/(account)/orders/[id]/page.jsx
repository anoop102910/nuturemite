import OrderPage from "@/components/pages/OrderPage";
import React from "react";

function Page({ params }) {
  return <OrderPage params={params} isUser/>;
}

export default Page;
