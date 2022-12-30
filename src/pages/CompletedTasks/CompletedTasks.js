import React from 'react';
import { useQuery } from '@tanstack/react-query';
import TaskCard from '../../components/TaskCard';

const CompletedTasks = () => {
    const {data: tasks=[], refetch} = useQuery({queryKey: ['completed-tasks'], queryFn: async()=>{
        const response = await fetch('https://x-tasks-server.vercel.app/completed-tasks')
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

export default CompletedTasks;