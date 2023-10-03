import {
  Alert,
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ResponsiveAppBar from "../partials/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function Profile() {
  const [author, setAuthor] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const user = useSelector((state) => state.user);
  const fetchPizzas = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8000/pizza/users/${user._id}/pizzas`,
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
      url: `http://localhost:8000/pizza/users/${user._id}/pizzas/${pizzaId}`,
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
        }}
      >
        {author !== null && (
          <Card
            sx={{
              width: "20rem",
              height: "18rem",
              mt: 5,
              mr: 4,
              p: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar sx={{ bgcolor: "orange", mb: 2, width: 80, height: 80 }}>
              A
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
        <Box mt={5} mb={7}>
          {pizzas.length !== 0 ? (
            <>
              <Typography variant="h5" mb={3}>
                My Recipes
              </Typography>
              {pizzas.map((pizza, idx) => (
                <Card
                  sx={{
                    width: "30rem",
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
                    <Typography sx={{ display: "flex" }}>
                      Veggies:{" "}
                      {pizza.veggies.map((veggie) => (
                        <Typography>{veggie.title}, </Typography>
                      ))}
                    </Typography>
                  </Stack>
                </Card>
              ))}
            </>
          ) : (
            <Alert severity="warning" sx={{ width: "30rem" }}>
              You have not created any pizza till now!
            </Alert>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Profile;
