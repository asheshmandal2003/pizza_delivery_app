import {
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from "@mui/material";
import LocalPizzaRoundedIcon from "@mui/icons-material/LocalPizzaRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Grid3x3RoundedIcon from "@mui/icons-material/Grid3x3Rounded";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";

export default function Order({
  id,
  name,
  from,
  email,
  orderId,
  time,
  location,
  status,
  phone,
  pageType,
  cancelOrder,
  deleteOrder,
  outForDelivery,
  delivered,
  disable,
}) {
  const theme = useTheme();
  return (
    <List
      sx={{
        width: phone ? 280 : 450,
        mt: 4,
        border: 1,
        borderColor: theme.palette.grey[700],
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <ListItem
        secondaryAction={
          disable ? (
            <CircularProgress size={20} />
          ) : (
            <>
              {(status === "Order cancelled" ||
                status === "Order delivered") && (
                <Tooltip title="Delete Order">
                  <IconButton
                    disabled={disable}
                    onClick={() => deleteOrder(id)}
                  >
                    <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
                  </IconButton>
                </Tooltip>
              )}
              {status !== "Order delivered" && (
                <Tooltip title="Cancel Order">
                  <IconButton onClick={() => cancelOrder(id)}>
                    <CloseIcon sx={{ color: "red" }} />
                  </IconButton>
                </Tooltip>
              )}
              {pageType === "admin" && (
                <>
                  {status === "Order placed" && (
                    <Tooltip title="Confirm Delivery">
                      <IconButton
                        disabled={disable}
                        onClick={() => outForDelivery(id)}
                      >
                        <DeliveryDiningIcon sx={{ color: "green" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {status === "Order outs for delivery" && (
                    <Tooltip title="Confirm Delivered">
                      <IconButton
                        disabled={disable}
                        onClick={() => delivered(id)}
                      >
                        <CheckCircleOutlineIcon sx={{ color: "green" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {status === "Order delivered" && (
                    <Tooltip title="Delivered">
                      <IconButton disabled={disable}>
                        <DoneAllIcon sx={{ color: "green" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              )}

              {pageType === "user" && (
                <>
                  {status === "Order placed" && (
                    <Tooltip title="Order Placed">
                      <IconButton>
                        <CheckCircleOutlineIcon sx={{ color: "green" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {status === "Order outs for delivery" && (
                    <Tooltip title="Order outs for delivery">
                      <IconButton>
                        <DeliveryDiningIcon sx={{ color: "green" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {status === "Order delivered" && (
                    <Tooltip title="Order delivered">
                      <IconButton>
                        <DoneAllIcon sx={{ color: "green" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              )}
            </>
          )
        }
      >
        <ListItemIcon sx={{ minWidth: 35 }}>
          <LocalPizzaRoundedIcon />
        </ListItemIcon>
        <ListItemText primary={name} secondary={moment(time).fromNow()} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemIcon sx={{ minWidth: 35 }}>
          <PersonRoundedIcon />
        </ListItemIcon>
        <ListItemText primary={from} />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: 35 }}>
          <EmailRoundedIcon />
        </ListItemIcon>
        <ListItemText primary={email} />
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ minWidth: 35 }}>
          <LocationOnRoundedIcon />
        </ListItemIcon>
        <ListItemText primary={location} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemIcon sx={{ minWidth: 35 }}>
          <Grid3x3RoundedIcon />
        </ListItemIcon>
        <ListItemText primary={orderId} />
      </ListItem>
    </List>
  );
}
