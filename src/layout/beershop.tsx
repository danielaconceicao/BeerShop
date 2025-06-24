import { Outlet } from "react-router-dom";
import Header from '../components/header/headerComponent';

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <footer></footer>
        </>
    )
}