import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import  TextField  from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditModal = ({open, setOpen, handleClose, task, refetch}) => {
    const taskId = task._id
    const [updateLoading, setUpdateLoading] = React.useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleUpdate = data => {
        setUpdateLoading(true)
        fetch(`https://x-tasks-server.vercel.app/update/${taskId}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            toast.success('Task updated')
            setUpdateLoading(false)
            setOpen(false)
            refetch()
        })
    }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" textAlign="center">
              Edit Your Task
            </Typography>
            <form onSubmit={handleSubmit(handleUpdate)}>
            <div style={{margin: '10px 5px'}}>
                <TextField error={errors.title} label="Task Title" variant="outlined" fullWidth {...register('title', {required: "Task Title is Required"})}/>
                {errors.title && <p style={{padding: '0px', margin: '4px 0px'}}>{errors.title.message}</p>}
            </div>
            <div style={{margin: '10px 5px'}}>
                <TextField multiline rows={4} error={errors.description} label="Task Description" variant="outlined" fullWidth {...register('description', {required: "Task Description is Required"})}/>
                {errors.description && <p style={{padding: '0px', margin: '4px 0px'}}>{errors.description.message}</p>}
            </div>
            <Stack direction="row" spacing={1} justifyContent='center'> 
            <Button variant="outlined" color='success' sx={{borderRadius: 5}} onClick={handleClose}>Cancel</Button>
            <LoadingButton color='warning' sx={{borderRadius: 5}} type='submit'
          loading={updateLoading}
          variant="contained"
        >
          Update
        </LoadingButton>
          </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditModal;