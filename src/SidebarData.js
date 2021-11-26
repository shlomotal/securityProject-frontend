import React from "react";
import * as IoIcons from "react-icons/io";
import * as HiIcons from "react-icons/hi";
import * as IoGame from "react-icons/io5";

export const SidebarData = [
  {
    title: "Sign Up",
    path: "/Signup",
    icon: <HiIcons.HiUserAdd />,
    cName: "nav-text",
  },
  {
    title: "Login",
    path: "/Login",
    icon: <HiIcons.HiUserAdd />,
    cName: "nav-text",
  },
  {
    title: "Change Password",
    path: "/ChangePassword",
    icon: <IoGame.IoGameControllerOutline />,
    cName: "nav-text",
  },
  {
    title: "Users Table",
    path: "/UsersTable",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
];
