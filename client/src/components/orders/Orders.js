import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import ResponsiveAppBar from "../partials/Navbar.js";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneIcon from "@mui/icons-material/Done";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";

function Orders() {
  const tab = useMediaQuery("(max-width:900px)");
  const phone = useMediaQuery("(max-width:600px)");
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState(null);
  const user = useSelector((state) => state.user);
  const fethOrders = async () => {
    try {
      await axios
        .get(`http://localhost:8000/pizza/${user._id}/orders`)
        .then((res) => {
          setOrders(res.data.orders);
          setCustomer(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fethOrders();
  }, []);
  const deleteOrder = async (orderId) => {
    await axios({
      method: "DELETE",
      url: `http://localhost:8000/pizza/${user._id}/orders/${orderId}`,
    })
      .then(() => {
        fethOrders();
      })
      .catch((err) => console.log(err));
  };
  const placeOrder = async (orderId) => {
    await axios({
      method: "PATCH",
      url: `http://localhost:8000/pizza/orders/${orderId}/place`,
    })
      .then(() => fethOrders())
      .catch((err) => console.log(err));
  };
  const outForDelivery = async (orderId) => {
    await axios({
      method: "PATCH",
      url: `http://localhost:8000/pizza/orders/${orderId}/outForDelivery`,
    })
      .then(() => fethOrders())
      .catch((err) => console.log(err));
  };
  const delivered = async (orderId) => {
    await axios({
      method: "PATCH",
      url: `http://localhost:8000/pizza/orders/${orderId}/delivered`,
    })
      .then(() => {
        fethOrders();
      })
      .catch((err) => console.log(err));
  };
  const cancelOrder = async (orderId) => {
    await axios({
      method: "PATCH",
      url: `http://localhost:8000/pizza/orders/${orderId}/cancel`,
    })
      .then(() => {
        fethOrders();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ResponsiveAppBar />
      <Box width="100%" display="flex" justifyContent="center">
        <Stack spacing={2} mt={5} mb={7}>
          {orders.length !== 0 ? (
            orders.map((order) => (
              <Card
                key={order._id}
                sx={{
                  width: tab ? (phone ? 280 : "22rem") : "30rem",
                  p: 4,
                }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">
                    Order From: {order.order_from}
                  </Typography>
                  <Box>
                    {(order.status === "Order cancelled" ||
                      order.status === "Order delivered") && (
                      <Tooltip title="Delete Order">
                        <IconButton onClick={() => deleteOrder(order._id)}>
                          <DeleteOutlineOutlinedIcon
                            sx={{ color: "red", fontSize: 30 }}
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                    {order.status !== "Order delivered" && (
                      <Tooltip title="Cancel Order">
                        <IconButton onClick={() => cancelOrder(order._id)}>
                          <CloseIcon sx={{ color: "red", fontSize: 30 }} />
                        </IconButton>
                      </Tooltip>
                    )}
                    {customer.pageType === "admin" && (
                      <>
                        {order.status === "Order not placed" && (
                          <Tooltip title="Place Order">
                            <IconButton onClick={() => placeOrder(order._id)}>
                              <DoneIcon sx={{ color: "green", fontSize: 30 }} />
                            </IconButton>
                          </Tooltip>
                        )}
                        {order.status === "Order placed" && (
                          <Tooltip title="Confirm Delivery">
                            <IconButton
                              onClick={() => outForDelivery(order._id)}
                            >
                              <DeliveryDiningIcon
                                sx={{ color: "green", fontSize: 30 }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                        {order.status === "Order outs for delivery" && (
                          <Tooltip title="Confirm Delivered">
                            <IconButton onClick={() => delivered(order._id)}>
                              <CheckCircleOutlineIcon
                                sx={{ color: "green", fontSize: 30 }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                        {order.status === "Order delivered" && (
                          <Tooltip title="Delivered">
                            <IconButton>
                              <DoneAllIcon
                                sx={{ color: "green", fontSize: 30 }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                      </>
                    )}
                  </Box>
                </Box>
                <Typography variant="body2">
                  Order Email: {order.order_email}
                </Typography>
                <Typography variant="body2">
                  Order for: {order.order_name}
                </Typography>
                <Typography variant="body2">
                  Order ID: {order.order_id}
                </Typography>
                <Typography variant="caption" mt={1}>
                  {moment(order.order_time).fromNow()}
                </Typography>
                {customer.pageType === "user" && (
                  <Typography variant="body2" color="green">
                    {order.status}
                  </Typography>
                )}
              </Card>
            ))
          ) : (
            <Alert
              severity="warning"
              sx={{ width: tab ? (phone ? 280 : "22rem") : "30rem" }}
            >
              No orders were found!
            </Alert>
          )}
        </Stack>
      </Box>
    </>
  );
}

export default Orders;
