import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

function Pizza({ name, price, description, image, user }) {
  const buy = async (amount) => {
    try {
      const formdata = new FormData();
      formdata.append("price", amount);
      formdata.append("user", user._id);
      formdata.append("pizza", name);
      await axios({
        method: "POST",
        url: "http://localhost:8000/pizza/checkout",
        data: formdata,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        const options = {
          key: "rzp_test_yidZEDo9VPhTmk",
          amount: res.data.amount,
          currency: "INR",
          name: "Ashesh Mandal",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: res.data.id,
          callback_url: "http://localhost:8000/pizza/paymentVerification",
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const pay = new window.Razorpay(options);
        pay.open();
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      sx={{
        width: 350,
        height: 440,
        mb: 4,
        boxShadow: 3,
        "&:hover": { boxShadow: 9 },
      }}
    >
      <Box height={197} overflow={"hidden"}>
        <CardMedia
          component="img"
          height={197}
          image={image}
          alt={name}
          sx={{
            transition: "0.3s ease-out",
            "&:hover": { scale: "120%" },
          }}
        />
      </Box>
      <CardHeader title={name} subheader={`₹${price}`} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {user.pageType === "user" && (
        <CardActions>
          <Button onClick={() => buy(price)} variant="contained" color="error">
            Order Now
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default Pizza;
