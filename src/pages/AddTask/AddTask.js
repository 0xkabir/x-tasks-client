import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import BackupIcon from '@mui/icons-material/Backup';
import './AddTask.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const imageHostKey = process.env.REACT_APP_imageHostKey
    const imageHostURL = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAddTask = (taskData) => {
        setLoading(true)
        const image = taskData.image[0]
        const formData = new FormData()
        formData.append('image', image)
        fetch(imageHostURL, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(imageHostData => {
            if(imageHostData.success){
                const task = {
                    title: taskData.title,
                    description: taskData.description,
                    isComplete: false,
                    imageURL: imageHostData.data.url
                }
        
                fetch('https://x-tasks-server.vercel.app/add-task', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(task)
                })
                .then(response => response.json())
                .then(data => {
                    toast.success('Task Added')
                    setLoading(false)
                    navigate('/my-tasks')
                })
            }
        })
    }

    const onSubmit = data => handleAddTask(data);

    useEffect(() => {
        const keyDownHandler = event => {
          if (event.key === 'Enter') {
              document.getElementById('submit-btn').click()
          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
      });
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='taskform'>
            <div style={{margin: '30px 5px'}}>
                <TextField error={errors.title} label="Task Title" variant="outlined" fullWidth {...register('title', {required: "Task Title is Required"})}/>
                {errors.title && <p style={{padding: '0px', margin: '4px 0px'}}>{errors.title.message}</p>}
            </div>
            <div style={{margin: '30px 5px'}}>
                <TextField multiline rows={4} error={errors.description} label="Task Description" variant="outlined" fullWidth {...register('description', {required: "Task Description is Required"})}/>
                {errors.description && <p style={{padding: '0px', margin: '4px 0px'}}>{errors.description.message}</p>}
            </div>
            <Button variant="outlined" component="label" sx={{display: 'flex', textAlign: 'center', margin: '30px 5px', height: '100px'}}>
                <span>
                <BackupIcon style={{fontSize: '48px'}}/>
                <p style={{margin:'0px'}}>upload image</p>
                </span>
                <input hidden accept="image/*" type="file" {...register('image', {required: 'Image is required'})}/>
            </Button>
            {errors.image && <p style={{padding: '0px', margin: '4px 0px'}}>{errors.image.message}</p>}
            <LoadingButton id='submit-btn'
            loading={loading}
            type='submit'
            variant="outlined"
            >
            Add Task
            </LoadingButton>
        </form>
    );
};

export default AddTask;