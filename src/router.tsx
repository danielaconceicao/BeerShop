import { createBrowserRouter } from "react-router-dom";
import Layout from './layout/beershop'
import Home from './pages/home/homeBeers';
import Login from './pages/login/login';
import Registration from './pages/registration/registration';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: 'registration',
                element: <Registration />
            }
        ]
    }
]);

export { router }