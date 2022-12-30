import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import InfoIcon from '@mui/icons-material/Info';
import { toast } from 'react-hot-toast';
import EditModal from './EditModal';
import CommentModal from './CommentModal';
import TaskModal from './TaskModal';

const TaskCard = ({task, refetch}) => {
    const complete = task.isComplete

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    const [showTaskModal, setShowTaskModal] = React.useState(false)
    const handleShowTaskModal = () => setShowTaskModal(true)
    const handleHideTaskModal = () => setShowTaskModal(false)

    const handleComplete = taskId => {
        fetch(`https://x-tasks-server.vercel.app/complete/${taskId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({complete: !complete})
        })
        .then(response => response.json())
        .then(data => {
            if(complete){
                toast.success('Task marked as incomplete')
            }
            else{
                toast.success('Task marked as complete')
            }
            refetch()
        })
    }

    const deleteTask = taskId => {
        fetch(`https://x-tasks-server.vercel.app/delete/${taskId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            toast.success('Task Deleted')
            refetch()
        })
    }

  return (
    <>
        <Card sx={{ mx: 4, my: 2 }}>
        <CardContent sx={{display: 'flex',flexDirection: {xs: 'column', sm: 'row'}, justifyContent: {xs: 'center', sm: 'space-between'}, alignItems: 'center'}}>
          <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6" color="text.secondary">
            {task.title}
          </Typography>
          <IconButton aria-label="comment" color='info' onClick={handleShowTaskModal}>
            <InfoIcon />
            </IconButton> 
          </Stack>
          {complete?<Button variant="contained" color='warning' sx={{borderRadius: 5, mt: {xs: 2, sm: 0}}} onClick={()=>handleComplete(task._id)}>Incomplete</Button> :
          <Stack direction="row" spacing={1} sx={{mt: {xs: 2, sm:0}}}>
            <IconButton aria-label="comment" color='info' onClick={handleShow}>
            <CommentIcon />
            </IconButton>    
            <IconButton aria-label="edit" color='warning' onClick={handleOpen}>
            <EditIcon />
            </IconButton>    
            <IconButton aria-label="delete" color='error' onClick={()=>deleteTask(task._id)}>
            <DeleteIcon />
            </IconButton>    
            <Button variant="contained" color='success' sx={{borderRadius: 5}} onClick={()=>handleComplete(task._id)}>Complete</Button>
          </Stack>}
        </CardContent>
    </Card>
    <EditModal open={open} setOpen={setOpen} handleClose={handleClose} task={task} refetch={refetch}/>
    <CommentModal show={show} setShow={setShow} handleHide={handleHide} task={task} refetch={refetch}/>
    <TaskModal task={task} showTaskModal={showTaskModal} handleHideTaskModal={handleHideTaskModal}/>
    </>
  );
}

export default TaskCard;