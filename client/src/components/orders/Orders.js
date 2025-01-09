import { useEffect, useState } from "react";
import { Alert, Box, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import OrderLoading from "../Loading/OrderLoading.js";
import { useNotification } from "../../context/NotificationProvider.jsx";
import Order from "./Order.js";

function Orders() {
  const [disableState, setDisableState] = useState({});
  const phone = useMediaQuery("(max-width:742px)");
  const [orders, setOrders] = useState(() => null);
  const [customer, setCustomer] = useState(() => null);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const notify = useNotification();

  const fethOrders = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/pizza/${user._id}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data.orders);
        setCustomer(res.data);
      })
      .catch((err) => notify(err.response.data.message, "error"));
  };

  useEffect(() => {
    fethOrders();
  }, []);

  const handleDisable = (orderId, value) => {
    setDisableState((prev) => ({ ...prev, [orderId]: value }));
  };

  const deleteOrder = async (orderId) => {
    handleDisable(orderId, true);
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_BASE_URL}/pizza/${user._id}/orders/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setOrders(orders.filter((order) => order._id !== orderId));
      })
      .catch((err) => notify(err.response.data.message, "error"))
      .finally(() => handleDisable(orderId, false));
  };

  const outForDelivery = async (orderId) => {
    handleDisable(orderId, true);
    await axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_BASE_URL}/pizza/orders/${orderId}/outForDelivery`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setOrders(
          orders.map((order) => {
            if (order._id === orderId) {
              order.status = "Order outs for delivery";
            }
            return order;
          })
        );
        notify("Order outs for delivery", "success");
      })
      .catch((err) => notify(err.response.data.message, "error"))
      .finally(() => handleDisable(orderId, false));
  };

  const delivered = async (orderId) => {
    handleDisable(orderId, true);
    await axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_BASE_URL}/pizza/orders/${orderId}/delivered`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setOrders(
          orders.map((order) => {
            if (order._id === orderId) {
              order.status = "Order delivered";
            }
            return order;
          })
        );
        notify("Order delivered successfully", "success");
      })
      .catch((err) => notify(err.response.data.message, "error"))
      .finally(() => handleDisable(orderId, false));
  };

  const cancelOrder = async (orderId) => {
    handleDisable(orderId, true);
    await axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_BASE_URL}/pizza/orders/${orderId}/cancel`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setOrders(
          orders.map((order) => {
            if (order._id === orderId) {
              order.status = "Order cancelled";
            }
            return order;
          })
        );
        notify("Order cancelled successfully", "success");
      })
      .catch((err) => notify(err.response.data.message, "error"))
      .finally(() => handleDisable(orderId, false));
  };

  return (
    <>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mb={6}
      >
        <div style={{ width: phone ? 280 : 450 }}>
          <Typography variant="h4" fontWeight={600} mt={5}>
            Orders
          </Typography>
        </div>
        {orders !== null ? (
          orders.length !== 0 ? (
            orders.map((order) => (
              <Order
                key={order._id}
                id={order._id}
                name={order.order_name}
                from={order.order_from}
                email={order.order_email}
                orderId={order.order_id}
                time={order.order_time}
                location={order.order_location}
                status={order.status}
                phone={phone}
                pageType={customer.pageType}
                cancelOrder={cancelOrder}
                deleteOrder={deleteOrder}
                outForDelivery={outForDelivery}
                delivered={delivered}
                disable={disableState[order._id] || false}
              />
            ))
          ) : (
            <Alert severity="warning" sx={{ width: phone ? 280 : 380, mt: 4 }}>
              No orders are found!
            </Alert>
          )
        ) : (
          <OrderLoading />
        )}
      </Box>
    </>
  );
}

export default Orders;
