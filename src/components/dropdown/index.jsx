import React, { useState } from "react";
import { Box, Button, IconButton, Modal } from "@mui/material";
import Capitalize from "../capitalize/Capitalize";
import { MoreVert } from "@mui/icons-material";

export const DropdownMenu = ({
  handleMenuClose,
  handleAction,
  actionItems,
  id,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleMenuClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVert />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 200,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
          }}
        >
          {actionItems.map((item, index) => (
            <Button
              key={index}
              sx={{ textTransform: "capitalize", mb: 1 }}
              onClick={() => {
                handleClose();
                handleAction(item.type, id);
              }}
            >
              {Capitalize(item.type)}
            </Button>
          ))}
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{ textTransform: "capitalize", mt: 1.5 }}
            onClick={handleClose}
          >
            close
          </Button>
        </Box>
      </Modal>
    </>
  );
};
