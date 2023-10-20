import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const veggiesOptions = [
  { title: "Tomatoes" },
  { title: "Bell Papers" },
  { title: "Mushrooms" },
  { title: "Onions" },
  { title: "Olives" },
  { title: "Spinach" },
  { title: "Artichoke Hearts" },
  { title: "Jalapeños" },
  { title: "Red Chili Peppers" },
  { title: "Zucchini" },
  { title: "Broccoli" },
  { title: "Aubergine (Eggplant)" },
  { title: "Sun-Dried Tomatoes" },
  { title: "Roasted Red Peppers" },
  { title: "Pineapple" },
];

function Form() {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      pizzaBase: "",
      sauce: "",
      cheese: "",
      veggies: "",
    },
    onSubmit: (values, onSubmitProps) => createPizza(values, onSubmitProps),
  });
  async function createPizza(values, onSubmitProps) {
    const formdata = new FormData();
    for (let value in values) {
      if (value === "veggies") {
        formdata.append("veggies", JSON.stringify(values[value]));
      } else {
        formdata.append(value, values[value]);
      }
    }
    await axios({
      method: "post",
      url: `http://localhost:8000/pizza/users/${user._id}/create-pizza`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => navigate("/pizza/user"))
      .catch((err) => console.log(err.response));
    onSubmitProps.resetForm();
  }

  return (
    <Box
      component="form"
      p={4}
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #bdbdbd",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h5" mb={1}>
        Create Pizza
      </Typography>
      <Typography variant="caption" mb={3}>
        Make Pizza With Your Own Recepie
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <TextField
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          label="Pizza Name"
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Pizza Base</InputLabel>
        <Select
          name="pizzaBase"
          label="Pizza Base"
          value={formik.values.pizzaBase}
          onChange={formik.handleChange}
          autoFocus
        >
          <MenuItem value="Classic Thin Crust">Classic Thin Crust</MenuItem>
          <MenuItem value="Thick Crust">Thick Crust</MenuItem>
          <MenuItem value="Stuffed Crust">Stuffed Crust</MenuItem>
          <MenuItem value="Whole Wheat Crust">Whole Wheat Crust</MenuItem>
          <MenuItem value="Gluten-Free Crust">Gluten-Free Crust</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Sauce</InputLabel>
        <Select
          name="sauce"
          label="Sauce"
          value={formik.values.sauce}
          onChange={formik.handleChange}
        >
          <MenuItem value="Tomato Sauce">Tomato Sauce</MenuItem>
          <MenuItem value="Barbecue Sauce">Barbecue Sauce</MenuItem>
          <MenuItem value="Soya Sauce">Soya Sauce</MenuItem>
          <MenuItem value="Hollandaise Sauce">Hollandaise Sauce</MenuItem>
          <MenuItem value="Pesto Sauce">Pesto Sauce</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Cheese</InputLabel>
        <OutlinedInput
          name="cheese"
          label="Cheese"
          value={formik.values.cheese}
          onChange={formik.handleChange}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Autocomplete
          multiple
          clearOnEscape={true}
          options={veggiesOptions}
          getOptionLabel={(opt) => opt.title}
          onChange={(e, value) => formik.setFieldValue("veggies", value)}
          includeInputInList
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Veggies"
              name="veggies"
              value={formik.values.veggies}
              onChange={formik.handleChange}
            />
          )}
        />
      </FormControl>
      <Button type="submit" variant="contained" fullWidth color="success">
        Create
      </Button>
    </Box>
  );
}

export default Form;
