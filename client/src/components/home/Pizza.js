import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

function Pizza({ name, price, description, image, isMobile }) {
  const [disable, setDisable] = useState(() => false);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [loadImg, setLoadImg] = useState(() => true);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      setLoadImg(false);
    };
  }, [image]);

  const buy = async (amount, name) => {
    try {
      setDisable(true);
      const formdata = new FormData();
      formdata.append("price", amount);
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_BASE_URL}/pizza/users/${user._id}/checkout`,
        data: formdata,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        const options = {
          key: process.env.REACT_APP_KEY_ID,
          amount: res.data.amount,
          currency: "INR",
          name: "Ashesh Mandal",
          description: "Payment for Pizza",
          image:
            "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?t=st=1696236164~exp=1696236764~hmac=3145a5296b1afcac9a73ec76137675f88527afe560203883a24b23da4d09aa67",
          order_id: res.data.id,
          callback_url: `${process.env.REACT_APP_BASE_URL}/pizza/users/${user._id}/pizzas/${name}/order/${res.data.id}`,
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
    setDisable(false);
  };
  return (
    <Card
      sx={{
        height: 460,
        pb: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": { boxShadow: 9 },
      }}
    >
      <div
        style={{
          height: 200,
          overflow: "hidden",
        }}
      >
        {loadImg ? (
          <Skeleton
            sx={{ height: 200 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            component="img"
            height={200}
            image={image}
            alt={name}
            loading="lazy"
            sx={{
              transition: "0.2s ease-out",
              "&:hover": { scale: "110%" },
            }}
          />
        )}
      </div>
      <CardHeader title={name} subheader={`₹${price}`} />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Divider />
      {user && (
        <CardActions>
          {user.pageType === "user" && (
            <Button
              fullWidth
              disabled={disable}
              onClick={() => buy(price, name)}
              variant="contained"
              color="error"
              size={isMobile ? "small" : "medium"}
              startIcon={
                <ShoppingCartRoundedIcon
                  fontSize={isMobile ? "small" : "medium"}
                />
              }
              sx={{
                mt: "auto",
              }}
            >
              Order Now
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}

export default Pizza;
