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
    CNavGroup,
    CBadge,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import {
    cilSpeedometer,
    cilPuzzle,
    cilCloudDownload,
    cilLayers,
} from "@coreui/icons";

const SidebarComponent = () => {
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
                        Open Issues
                    </CNavItem>
                    <CNavItem href="#">
                        <CIcon
                            customClassName="nav-icon"
                            icon={cilSpeedometer}
                        />{" "}
                        Issues in Progress
                    </CNavItem>
                    <CNavItem href="#">
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
