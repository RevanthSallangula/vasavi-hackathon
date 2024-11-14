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
                    <CSidebarBrand>CoreUI</CSidebarBrand>
                </CSidebarHeader>
                <CSidebarNav>
                    <CNavTitle>Nav Title</CNavTitle>
                    <CNavItem href="#">
                        <CIcon
                            customClassName="nav-icon"
                            icon={cilSpeedometer}
                        />{" "}
                        Nav item
                    </CNavItem>
                    <CNavItem href="#">
                        <CIcon
                            customClassName="nav-icon"
                            icon={cilSpeedometer}
                        />{" "}
                        With badge <CBadge color="primary ms-auto">NEW</CBadge>
                    </CNavItem>
                    <CNavGroup
                        toggler={
                            <>
                                <CIcon
                                    customClassName="nav-icon"
                                    icon={cilPuzzle}
                                />{" "}
                                Nav dropdown
                            </>
                        }
                    >
                        <CNavItem href="#">
                            <span className="nav-icon">
                                <span className="nav-icon-bullet"></span>
                            </span>{" "}
                            Nav dropdown item
                        </CNavItem>
                        <CNavItem href="#">
                            <span className="nav-icon">
                                <span className="nav-icon-bullet"></span>
                            </span>{" "}
                            Nav dropdown item
                        </CNavItem>
                    </CNavGroup>
                    <CNavItem href="https://coreui.io">
                        <CIcon
                            customClassName="nav-icon"
                            icon={cilCloudDownload}
                        />{" "}
                        Download CoreUI
                    </CNavItem>
                    <CNavItem href="https://coreui.io/pro/">
                        <CIcon customClassName="nav-icon" icon={cilLayers} />{" "}
                        Try CoreUI PRO
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
