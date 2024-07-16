import { useEffect, forwardRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Grow from "@mui/material/Grow"; 
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const Toasts = (props) => {
  const { propResponseMessage, propStatusData, propActionType } = props;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  useEffect(() => {
    const successResponseMessage =
      propStatusData.successStatusData && propActionType === "insert"
        ? propResponseMessage.insert
        : propStatusData.successStatusData && propActionType === "update"
        ? propResponseMessage.update
        : propStatusData.successStatusData && propActionType === "success"
        ? propResponseMessage.success
        : null;

    const errorResponseMessage = propStatusData.errorStatusData
      ? propStatusData.errorStatusData
      : null;

    const newResponseMessage = successResponseMessage || errorResponseMessage;
    const newStatus = successResponseMessage
      ? "success"
      : errorResponseMessage
      ? "error"
      : "info";

    setResponseMessage(newResponseMessage);
    setStatus(newStatus);

    if (newResponseMessage && newStatus) {
      handleClick();
    }
    if(newResponseMessage===null && newStatus==="info"  ){
      setOpen(false);
    }

  }, [propResponseMessage, propStatusData, propActionType]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={4800}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={Grow}
      >
        <Alert
          variant='filled'
          onClose={handleClose}
          severity={status}
          color={status}
          sx={{ width: "100%" }}
        >
          {responseMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Toasts;