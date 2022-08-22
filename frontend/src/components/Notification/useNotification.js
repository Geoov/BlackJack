import { useSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import React, { Fragment, useEffect, useState } from "react";
import "./useNotification.scss";

const useNotification = () => {
  const [conf, setConf] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = (key) => (
    <Fragment>
      <IconButton
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        <HighlightOffRoundedIcon />
      </IconButton>
    </Fragment>
  );
  useEffect(() => {
    if (conf?.msg) {
      let variant = "error";
      if (conf.variant) {
        variant = conf.variant;
      }
      enqueueSnackbar(conf.msg, {
        variant: variant,
        autoHideDuration: 2000,
        action,
      });
    }
  }, [conf]);
  return [conf, setConf];
};

export default useNotification;
