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

const SidebarComponent = ({ onClick }) => {
    return (
        <div>
            <CSidebar className="border-end sidebar-full-height">
                <CSidebarHeader className="border-bottom">
                    <CSidebarBrand>PROJECT TITLE</CSidebarBrand>
                </CSidebarHeader>
                <CSidebarNav>
                    <CNavTitle>Sidebar</CNavTitle>
                    <CNavItem href="#" onClick={() => onClick("Open Issues")}>
                        <CIcon
                            customClassName="nav-icon"
                            icon={cilSpeedometer}
                        />{" "}
                        Open Issues
                    </CNavItem>
                    <CNavItem
                        href="#"
                        onClick={() => onClick("Issues in Progress")}
                    >
                        <CIcon
                            customClassName="nav-icon"
                            icon={cilSpeedometer}
                        />{" "}
                        Issues in Progress
                    </CNavItem>
                    <CNavItem
                        href="#"
                        onClick={() => onClick("Completed Issues")}
                    >
                        <CIcon
                            customClassName="nav-icon"
                            icon={cilSpeedometer}
                        />{" "}
                        Completed Issues
                    </CNavItem>
                </CSidebarNav>
                <CSidebarHeader className="border-top">
                    <CSidebarToggler />
                </CSidebarHeader>
            </CSidebar>
        </div>
    );
};

export default SidebarComponent;
