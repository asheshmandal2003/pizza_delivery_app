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

function Pizza({ name, price, description, image }) {
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
      <CardHeader title={name} subheader={`${price}`} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="error">
          Order Now
        </Button>
      </CardActions>
    </Card>
  );
}

export default Pizza;
