import React from "react";
import "../styles/SidebarComponent.css";
import {
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarHeader,
    CSidebarToggler,
    CNavItem,
    CNavTitle,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { cilSpeedometer } from "@coreui/icons";

const SidebarPrivate = ({}) => {
    return (
        <div>
            <CSidebar className="border-end sidebar-full-height">
                <CSidebarHeader className="border-bottom">
                    <CSidebarBrand>PROJECT TITLE</CSidebarBrand>
                </CSidebarHeader>
                <CSidebarNav>
                    <CNavTitle>Sidebar</CNavTitle>
                    <CNavItem href="#">
                        <CIcon
                            customClassName="nav-icon"
                            icon={cilSpeedometer}
                        />{" "}
                        Add a Farmer
                    </CNavItem>
                </CSidebarNav>
                <CSidebarHeader className="border-top">
                    <CSidebarToggler />
                </CSidebarHeader>
            </CSidebar>
        </div>
    );
};

export default SidebarPrivate;
