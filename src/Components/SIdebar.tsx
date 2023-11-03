import React from "react";
import { useState } from "react";
import Control from "../assets/Image/control.png";
import home from "../assets/Image/home.svg";
import contact from "../assets/Image/contacts.svg";
import { useNavigate } from "react-router-dom";
type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const [active, setActive] = useState<number>(0);
  const Menus: any = [
    { title: "Dashboard", src: home, navigate: "/" },
    { title: "Contacts", src: contact, navigate: "/contact" },
  ];
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-max md:w-full">
      <div className="w-full">
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <ul className="pt-6">
          {Menus.map((Menu: any, index: any) => (
            <li
              key={index}
              onClick={() => {
                setActive(index);
                navigate(`${Menu.navigate}`);
              }}
              className={`flex rounded-md p-1 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center w-full overflow-hidden
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === active && "bg-light-white"
                } `}
            >
              <img src={`${Menu.src}`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;