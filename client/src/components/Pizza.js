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
import { useSelector } from "react-redux";

function Pizza({ id, name, price, description, image }) {
  const user = useSelector((state) => state.user);
  const buy = async (amount) => {
    try {
      const formdata = new FormData();
      formdata.append("price", amount);
      formdata.append("pizza", name);
      await axios({
        method: "POST",
        url: `http://localhost:8000/pizza/users/${user._id}/checkout`,
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
          description: "Payment for Pizza",
          image:
            "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?t=st=1696236164~exp=1696236764~hmac=3145a5296b1afcac9a73ec76137675f88527afe560203883a24b23da4d09aa67",
          order_id: res.data.id,
          callback_url: `http://localhost:8000/pizza/users/${user._id}/pizzas/${id}/order/${res.data.id}`,
          prefill: {
            name: `${user.name}`,
            email: `${user.email}`,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#ff0000",
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
