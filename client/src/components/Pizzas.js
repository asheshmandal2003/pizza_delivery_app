import { useEffect, useState } from "react";
import axios from "axios";
import Pizza from "./Pizza";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

function Pizzas() {
  const [pizzas, setPizzas] = useState([{}]);
  const tab = useMediaQuery("(max-width:1200px)");
  const phone = useMediaQuery("(max-width:800px)");
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
    <ImageList
      direction="row"
      cols={tab ? (phone ? 1 : 2) : 3}
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
