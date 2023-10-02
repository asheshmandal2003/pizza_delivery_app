import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import ResponsiveAppBar from "../partials/Navbar.js";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function Orders() {
  const tab = useMediaQuery("(max-width:900px)");
  const phone = useMediaQuery("(max-width:600px)");
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  const fethOrders = async () => {
    try {
      await axios
        .get(`http://localhost:8000/pizza/${user._id}/orders`)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fethOrders();
  }, []);
  const cancelOrder = async (orderId) => {
    await axios({
      method: "DELETE",
      url: `http://localhost:8000/pizza/${user._id}/orders/${orderId}`,
    })
      .then(() => fethOrders())
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
                  width: tab ? (phone ? "18rem" : "22rem") : "30rem",
                  p: 4,
                }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">
                    Order From: {order.order_from}
                  </Typography>
                  <IconButton onClick={() => cancelOrder(order._id)}>
                    <DeleteOutlineOutlinedIcon
                      sx={{ color: "red", fontSize: 30 }}
                    />
                  </IconButton>
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
              </Card>
            ))
          ) : (
            <Alert
              severity="warning"
              sx={{ width: tab ? (phone ? "18rem" : "22rem") : "30rem" }}
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
