import { Button, CircularProgress, useMediaQuery } from "@mui/material";
export default function LoadingBtn() {
  const isPhone = useMediaQuery("(max-width:742px)");
  return (
    <Button variant="contained" disabled size={isPhone ? "small" : "medium"}>
      <CircularProgress size={isPhone ? 20 : 24} color="inherit" />
    </Button>
  );
}
