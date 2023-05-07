import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Storage from "./Storage";
import Edit from "./Edit";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Home></Home>,
    },
    {
        path:'/data',
        element:<Storage></Storage>,
    },
    {
        path:'data/:id',
        element:<Edit></Edit>,
        loader:({params})=> fetch(`http://localhost:5000/users/${params.id}`)
    }
    
])

export default router