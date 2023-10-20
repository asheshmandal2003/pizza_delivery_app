import {
  Alert,
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ResponsiveAppBar from "../partials/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function Profile() {
  const [author, setAuthor] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const phone = useMediaQuery("(max-width:1200px)");
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const fetchPizzas = async () => {
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/pizza/users/${user._id}/pizzas`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setPizzas(res.data.pizzas);
        setAuthor(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchPizzas();
  }, []);
  const deletePizza = async (pizzaId) => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_BASE_URL}/pizza/users/${user._id}/pizzas/${pizzaId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => fetchPizzas())
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          mt: 5,
          mb: 7,
        }}
      >
        <Box
          sx={{
            width: pizzas.length === 0 ? "100%" : "70%",
            display: "flex",
            justifyContent:
              pizzas.length === 0
                ? "center"
                : phone
                ? "center"
                : "space-between",
            flexWrap: "wrap",
          }}
        >
          {author !== null && (
            <Card
              sx={{
                width: phone ? 300 : 350,
                height: "18rem",
                p: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar sx={{ bgcolor: "orange", mb: 3, width: 80, height: 80 }}>
                {author.name[0]}
              </Avatar>
              <Box width="100%">
                <Typography>{author.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography sx={{ alignItems: "center" }}>
                  {author.email}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography>{author.location}</Typography>
                <Divider sx={{ mb: 2 }} />
              </Box>
            </Card>
          )}
          <Box
            width={pizzas.length === 0 ? 0 : phone ? 280 : 400}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {pizzas.length !== 0 ? (
              <>
                <Typography variant="h5" mt={phone ? 5 : 0} mb={3}>
                  My Recipes
                </Typography>
                {pizzas.map((pizza, idx) => (
                  <Card
                    key={pizza._id}
                    sx={{
                      width: "100%",
                      mb: 3,
                      p: 4,
                    }}
                  >
                    <Stack spacing={2}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6">#Recipe {idx + 1}</Typography>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => deletePizza(pizza._id)}>
                            <DeleteOutlineIcon
                              sx={{ color: "red", fontSize: 32 }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Typography>Pizza Name: {pizza.name}</Typography>
                      <Typography>Pizza Base: {pizza.pizzaBase}</Typography>
                      <Typography>Sauce: {pizza.sauce}</Typography>
                      <Typography>Cheese: {pizza.cheese}</Typography>
                      <List>
                        <Typography>Veggies:</Typography>
                        {pizza.veggies.map((veggie) => (
                          <ListItem key={Math.random()}>
                            <ListItemText primary={veggie.title} />
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  </Card>
                ))}
              </>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
