import { FC } from "react";
import { AppHeader } from "../app-header/app-header"
import { Outlet } from "react-router-dom"

const Layout:FC = () => {

    return (<div>
        <AppHeader />
        <Outlet />
    </div>)
}

export default Layout;