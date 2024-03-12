import React from "react";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { SignIn } from "@clerk/clerk-react";
import {dark} from "@clerk/themes";

import './SignInDialog.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignInDialog({ 
  open={open},
  handleClose={handleSignInDialogClose} 
}) {

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="dialog__container">
        <SignIn appearance={dark}/>
      </div>
    </Dialog>
  );
}
