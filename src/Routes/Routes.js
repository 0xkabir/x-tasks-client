import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AddTask from "../pages/AddTask/AddTask";
import MyTasks from "../pages/MyTasks/MyTasks";
import CompletedTasks from './../pages/CompletedTasks/CompletedTasks';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <AddTask/>
            }, 
            {
                path: 'add-task',
                element: <AddTask/>
            }, 
            {
                path: 'my-tasks',
                element: <MyTasks/>
            },
            {
                path: 'completed-tasks',
                element: <CompletedTasks/>
            }
        ]
    }
])