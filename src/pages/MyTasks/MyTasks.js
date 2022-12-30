import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TaskCard from '../../components/TaskCard';

const MyTasks = () => {

    const {data: tasks=[], refetch} = useQuery({queryKey: ['my-tasks'], queryFn: async()=>{
        const response = await fetch('https://x-tasks-server.vercel.app/my-tasks')
        const data = await response.json()
        return data
    }})
    return (
        <div>
            {
                tasks.map(task => <TaskCard key={task._id} task={task} refetch={refetch}/>)
            }
        </div>
    );
};

export default MyTasks;