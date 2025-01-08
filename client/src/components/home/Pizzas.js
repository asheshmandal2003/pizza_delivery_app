import Pizza from "./Pizza";
import { Grid, useMediaQuery } from "@mui/material";
import { pizzas } from "../../data/pizzas";

function Pizzas() {
  const phone = useMediaQuery("(max-width:742px)");

  return (
    <Grid container spacing={phone ? 3 : 5} p={phone ? 6 : 5}>
      {pizzas.map((pizza, idx) => {
        return (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Pizza
              id={pizza.id}
              name={pizza.name}
              price={pizza.price}
              description={pizza.description}
              image={pizza.image_url}
              isMobile={phone}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Pizzas;
