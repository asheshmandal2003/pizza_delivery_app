import { useEffect, useState } from "react";
import axios from "axios";
import Pizza from "./Pizza";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";

function Pizzas() {
  const [pizzas, setPizzas] = useState([{}]);
  const phone = useMediaQuery("(max-width:900px)");
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        await axios.get("http://localhost:8000/pizzas").then((response) => {
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
    <ImageList
      direction="row"
      cols={phone ? 1 : 3}
      sx={{
        p: 7,
        display: `${phone ? "flex" : false}`,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {pizzas.map((pizza, idx) => {
        return (
          <ImageListItem key={idx}>
            <Pizza
              id={pizza._id}
              name={pizza.name}
              price={pizza.price}
              description={pizza.description}
              image={pizza.image_url}
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

export default Pizzas;
