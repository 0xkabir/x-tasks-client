import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import  TextField  from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 const CommentModal = ({show, setShow, handleHide, task, refetch}) => {
    const [commentLoading, setCommentLoading] = React.useState(false)

    const handleAddComment = data => {
        fetch(`https://x-tasks-server.vercel.app/add-comment/${task._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            toast.success('Comment Added')
            setCommentLoading(false)
            setShow(false)
            refetch()
        })
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={show}
        onClose={handleHide}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2" textAlign="center">
              Add A Comment
            </Typography>
            <form onSubmit={handleSubmit(handleAddComment)}>
            <div style={{margin: '10px 5px'}}>
                <TextField multiline rows={4} error={errors.comment} label="Comment" variant="outlined" fullWidth {...register('comment', {required: "Comment is Required"})}/>
                {errors.comment && <p style={{padding: '0px', margin: '4px 0px'}}>{errors.comment.message}</p>}
            </div>
            <Stack direction="row" spacing={1} justifyContent='center'> 
            <Button variant="outlined" color='warning' sx={{borderRadius: 5}} onClick={handleHide}>Cancel</Button>
            <LoadingButton color='success' sx={{borderRadius: 5}} type='submit'
          loading={commentLoading}
          variant="contained"
        >
          Add Comment
        </LoadingButton>
          </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CommentModal;