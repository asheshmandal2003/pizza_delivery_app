import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useState } from "react";

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
  const phone = useMediaQuery("(max-width:600px)");
  const [disable, setDisable] = useState(() => false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      pizzaBase: "Select a pizza base",
      sauce: "Select one sauce",
      cheese: "",
      veggies: "",
    },
    onSubmit: (values) => createPizza(values),
    validationSchema: yup.object({
      name: yup.string().required("Pizza name is required!"),
      pizzaBase: yup
        .string()
        .required("Pizza base is required!")
        .test(
          "is-selected",
          "Select a pizza base",
          (value) => value !== "Select a pizza base"
        ),
      sauce: yup
        .string()
        .required("Sauce is required!")
        .test(
          "is-selected",
          "Select one sauce",
          (value) => value !== "Select one sauce"
        ),
      cheese: yup.string().required("Cheese is required!"),
    }),
  });
  async function createPizza(values) {
    setDisable(true);
    const formdata = new FormData();
    for (let value in values) {
      if (value === "veggies") {
        formdata.append("veggies", JSON.stringify(values[value]));
      } else {
        formdata.append(value, values[value]);
      }
    }
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/pizza/users/${user._id}/create-pizza`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => navigate("/pizza/user"))
      .catch((err) => console.log(err.response));
    setDisable(false);
  }

  return (
    <Box
      component="form"
      width={phone ? "90%" : 350}
      p={phone ? 3 : 4}
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
      <Typography variant={phone ? "h6" : "h5"} mb={1}>
        Create Pizza
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Make pizza with youur own recepie
      </Typography>
      <Stack spacing={3} width="100%">
        <TextField
          autoFocus
          fullWidth
          id="pizzaName"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          label="Pizza Name"
          placeholder="Enter the name of the pizza"
          size={phone ? "small" : "medium"}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.name) && Boolean(formik.errors.name)}
          helperText={Boolean(formik.touched.name) && formik.errors.name}
        />
        <FormControl
          fullWidth
          error={
            Boolean(formik.touched.pizzaBase) &&
            Boolean(formik.errors.pizzaBase)
          }
          size={phone ? "small" : "medium"}
        >
          <InputLabel>Pizza Base</InputLabel>
          <Select
            id="pizzabase"
            name="pizzaBase"
            label="Pizza Base"
            value={formik.values.pizzaBase}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size={phone ? "small" : "medium"}
          >
            <MenuItem value="Select a pizza base" disabled>
              <em>Select a pizza base</em>
            </MenuItem>
            <MenuItem value="Classic Thin Crust">Classic Thin Crust</MenuItem>
            <MenuItem value="Thick Crust">Thick Crust</MenuItem>
            <MenuItem value="Stuffed Crust">Stuffed Crust</MenuItem>
            <MenuItem value="Whole Wheat Crust">Whole Wheat Crust</MenuItem>
            <MenuItem value="Gluten-Free Crust">Gluten-Free Crust</MenuItem>
          </Select>
          <FormHelperText>
            {Boolean(formik.touched.pizzaBase) && formik.errors.pizzaBase}
          </FormHelperText>
        </FormControl>
        <FormControl
          fullWidth
          error={Boolean(formik.touched.sauce) && Boolean(formik.errors.sauce)}
          size={phone ? "small" : "medium"}
        >
          <InputLabel>Sauce</InputLabel>
          <Select
            id="sauce"
            name="sauce"
            label="Sauce"
            value={formik.values.sauce}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size={phone ? "small" : "medium"}
          >
            <MenuItem value="Select one sauce" disabled>
              <em>Select one sauce</em>
            </MenuItem>
            <MenuItem value="Tomato Sauce">Tomato Sauce</MenuItem>
            <MenuItem value="Barbecue Sauce">Barbecue Sauce</MenuItem>
            <MenuItem value="Soya Sauce">Soya Sauce</MenuItem>
            <MenuItem value="Hollandaise Sauce">Hollandaise Sauce</MenuItem>
            <MenuItem value="Pesto Sauce">Pesto Sauce</MenuItem>
          </Select>
          <FormHelperText>
            {Boolean(formik.touched.sauce) && formik.errors.sauce}
          </FormHelperText>
        </FormControl>
        <TextField
          fullWidth
          id="cheese"
          name="cheese"
          label="Cheese"
          placeholder="Enter a cheese name"
          size={phone ? "small" : "medium"}
          value={formik.values.cheese}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            Boolean(formik.touched.cheese) && Boolean(formik.errors.cheese)
          }
          helperText={Boolean(formik.touched.cheese) && formik.errors.cheese}
        />
        <FormControl fullWidth size={phone ? "small" : "medium"}>
          <Autocomplete
            multiple
            clearOnEscape={true}
            options={veggiesOptions}
            getOptionLabel={(opt) => opt.title}
            onChange={(e, value) => formik.setFieldValue("veggies", value)}
            onBlur={formik.handleBlur}
            size={phone ? "small" : "medium"}
            includeInputInList
            renderInput={(params) => (
              <TextField
                {...params}
                name="veggies"
                placeholder="Write or select veggies"
                value={formik.values.veggies}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            )}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size={phone ? "small" : "medium"}
          disabled={disable}
          color="success"
        >
          Create
        </Button>
      </Stack>
    </Box>
  );
}

export default Form;
