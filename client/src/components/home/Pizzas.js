import { useEffect, useState } from "react";
import axios from "axios";
import Pizza from "./Pizza";
import { Grid, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import HomeLoading from "../Loading/HomeLoading";

function Pizzas() {
  const [pizzas, setPizzas] = useState([]);
  const phone = useMediaQuery("(max-width:600px)");
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_BASE_URL}/pizzas`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setPizzas(response.data.pizzas);
            }
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPizzas();
  }, []);

  return (
    <>
      {pizzas.length === 0 ? (
        <Grid container spacing={phone ? 3 : 5} p={phone ? 6 : 5}>
          <Grid item xs={12} sm={6} md={3}>
            <HomeLoading />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HomeLoading />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HomeLoading />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HomeLoading />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HomeLoading />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HomeLoading />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HomeLoading />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <HomeLoading />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={phone ? 3 : 5} p={phone ? 6 : 5}>
          {pizzas.map((pizza, idx) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Pizza
                  id={pizza._id}
                  name={pizza.name}
                  price={pizza.price}
                  description={pizza.description}
                  image={pizza.image_url}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
}

export default Pizzas;
