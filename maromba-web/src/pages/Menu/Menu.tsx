import "./Menu.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider/UseAuth";
import { useState } from "react";
import { getUserLocalStorage } from "../../contexts/AuthProvider/util";

export function Menu() {
    const auth = useAuth();
    const userLocal = getUserLocalStorage();
    const navigate = useNavigate();

    let [openCloseMenu, setOpenCloseMenu] = useState<string>("contents");

    const loggout = () => {
        auth.logout();
        navigate("/");
    };

    const handleClickConfigUser = () => {
        navigate("/menu/user", {
            state: { titlePage: "Editar usuário", labelButton: "Editar", userEdit: userLocal, disableBack: true },
        });
    };
    

    const openCloseMenuClick = () => {
        setOpenCloseMenu(openCloseMenu === "contents" ? "contents open-close-menu" : "contents");
    };

    return (
        <>
            <div className={openCloseMenu}>
                <div className="menu">
                    <aside className="sidebar">

                        <header className="sidebar-header">
                            <h1 className="title-header">
                                <img className="logo-img" src="/src/assets/img/logo.png" />  
                                <span className="name-company">MarombaApp</span>  
                            </h1>
                        </header>
                        <nav>
                            <div className="profile">
                                <img className="avatar" src="../../src/assets/img/avatar.png"></img>
                                <div className="user pointer"  onClick={handleClickConfigUser}>
                                    <div className="user-name">{userLocal?.name}</div>
                                    <i className="material-symbols-outlined icon-config">settings_account_box</i>
                                </div>
                            </div>
                            <button onClick={(e) => navigate("/menu/users")}>
                                <span>
                                    <i className="material-symbols-outlined">
                                        person
                                    </i>
                                    <span>Usuários</span>
                                </span>
                            </button>
                            <button onClick={(e) => navigate("/menu/companies")}>
                                <span>
                                    <i className="material-symbols-outlined">
                                        apartment
                                    </i>
                                    <span>Empresas</span>
                                </span>
                            </button>
                            <button onClick={(e) => navigate("/menu/exercises")}>
                                <span>
                                    <i className="material-symbols-outlined">
                                        fitness_center
                                    </i>
                                    <span>Exercícios</span>
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
                            <button onClick={openCloseMenuClick} className="width-menu">
                                <span className="width-menu">
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