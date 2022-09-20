import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
  
const Admindata= [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: <MdIcons.MdDashboard />,
  },
  {
    title: "View Books",
    path: "/view-books/",
    icon: <MdIcons.MdViewList />,
  },
  {
    title: "Create Books",
    path: "/create-books/",
    icon: <MdIcons.MdOutlineCreate />,
  },
  {
    title: "Edit Books",
    path: "/edit-books/",
    icon: <FaIcons.FaEdit />,
  },
  {
    title: "Delete Books",
    path: "/delete-books/",
    icon: <MdIcons.MdDeleteSweep />,
  }
];

// const Studentdata = [
//   {
//     title: "Dashboard",
//     path: "/dashboard/",
//     icon: <MdIcons.MdDashboard />,
//   },
//     {
//       title: "View Books",
//       path: "/view-books/",
//       icon: <MdIcons.MdViewList />,
//     },
// ];

export const SidebarData = Admindata