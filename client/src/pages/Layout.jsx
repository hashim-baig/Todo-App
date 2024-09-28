import { Outlet } from "react-router-dom";
import Heading from "../components/Heading/Heading";

export default function Layout() {
    return (
        <>
            <Heading />
            <Outlet />
        </>
    )
}