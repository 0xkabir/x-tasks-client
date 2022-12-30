import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TaskModal = ({ task, showTaskModal, handleHideTaskModal }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showTaskModal}
        onClose={handleHideTaskModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showTaskModal}>
          <Box sx={style}>
          <IconButton aria-label="close" sx={{position: 'absolute', right: 4, top: 2}} onClick={handleHideTaskModal}>
        <CancelIcon />
      </IconButton>
            <Card sx={{ maxWidth: 345, mt: 2 }}>
              <CardMedia
                component="img"
                alt="task image"
                height="180"
                image={task?.imageURL}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {task.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {task.description}
                </Typography>
                {task.comment && <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {task.comment}
                </Typography>}
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TaskModal;
