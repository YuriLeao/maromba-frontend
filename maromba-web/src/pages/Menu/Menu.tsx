import "./Menu.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider/UseAuth";
import { useState } from "react";

export function Menu() {
    const auth = useAuth();
    const navigate = useNavigate();

    let [openCloseMenu, setOpenCloseMenu] = useState<string>("contents");

    const loggout = () => {
        auth.logout();
        navigate("/");
    };

    const openCloseMenuClick = () => {
        setOpenCloseMenu(openCloseMenu === "contents" ? "contents openCloseMenu" : "contents");
    };

    return (
        <>
            <div className={openCloseMenu}>
                <div className="menu">
                    <aside className="sidebar">

                        <header className="sidebar-header">
                            <img className="logo-img" src="/src/assets/img/logo.png" />
                            <img className="logo-icon" src="/src/assets/img/logo.png" />
                            <h1 className="ml14">MarombaApp</h1>
                        </header>
                        <nav>
                            <div className="profile">
                                <img className="avatar" src="../../src/assets/img/avatar.png"></img>
                                <div className="username">Yuri</div>
                            </div>
                            <button>
                                <span>
                                    <i className="material-symbols-outlined">
                                        menu
                                    </i>
                                    <span>Home</span>
                                </span>
                            </button>
                            <button>
                                <span>
                                    <i className="material-symbols-outlined">
                                        menu
                                    </i>
                                    <span>Search</span>
                                </span>
                            </button>
                            <button>
                                <span>
                                    <i className="material-symbols-outlined">
                                        menu
                                    </i>
                                    <span>Explore</span>
                                </span>
                            </button>
                            <button>
                                <span>
                                    <i className="material-symbols-outlined">
                                        menu
                                    </i>
                                    <span>Messages</span>
                                </span>
                            </button>
                            <button onClick={openCloseMenuClick} className="widthMenu">
                                <span className="widthMenu">
                                    <i className="material-symbols-outlined">
                                        menu
                                    </i>
                                </span>
                            </button>
                        </nav>
                    </aside>
                </div>
                <div className="frame">
                    <Outlet />
                </div>
            </div>
        </>
    );
};