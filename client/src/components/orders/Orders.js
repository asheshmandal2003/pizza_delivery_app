import { useEffect, useState } from "react";
import { Box, Card, Stack, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";

function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fethOrders = async () => {
      try {
        await axios
          .get(`http://localhost:8000/pizza/${user._id}/orders`)
          .then((res) => {
            console.log(res.data);
            setOrders(res.data);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
    fethOrders();
  }, []);
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Stack spacing={2} mt={5}>
        {orders.length !== 0 &&
          orders.map((order) => (
            <Card sx={{ width: "30rem", p: 4 }}>
              <>
                <Typography variant="h5">Name: {order.order_name}</Typography>
                <Typography variant="body2">
                  Order ID: {order.order_id}
                </Typography>
                <Typography variant="caption" mt={1}>
                  {moment(order.order_time).fromNow()}
                </Typography>
              </>
            </Card>
          ))}
      </Stack>
    </Box>
  );
}

export default Orders;
