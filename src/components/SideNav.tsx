import React from "react";
import Navlink from "./Navlink";
import UserCard from "./UserCard";

function SideNav() {
  const navLinks = [
    {
      title: "Home",
      icon: "/assets/icons/home.svg",
      link: "/home",
    },
    {
      title: "Explore",
      icon: "/assets/icons/wallpaper.svg",
      link: "/explore",
    },
    {
      title: "People",
      icon: "/assets/icons/people.svg",
      link: "/people",
    },
    {
      title: "Saved",
      icon: "/assets/icons/saved.svg",
      link: "/saved",
    },
    {
      title: "Create Post",
      icon: "/assets/icons/gallery-add.svg",
      link: "/create-post",
    },
  ];
  return (
    <div className="w-1/4 flex flex-col justify-between p-8">
      <div className="flex flex-col gap-5">
        <div>
          <img src="assets/images/logo.svg" alt="logo" />
        </div>
        <div>
          <UserCard name="Javascript" username="thakur" />
        </div>
        <div className="w-full flex flex-col gap-5 ">
          {navLinks.map((nLink) => {
            return (
              <Navlink
                key={nLink.title}
                title={nLink.title}
                icon={nLink.icon}
                link={nLink.link}
              />
            );
          })}
        </div>
      </div>
      <div className="">
        <Navlink
          icon="assets/icons/logout.svg"
          title="Log out"
          link="/logout"
        />
      </div>
    </div>
  );
}

export default SideNav;
