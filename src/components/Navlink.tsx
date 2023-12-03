import React from "react";
import Link from "next/link";
interface NavlinkProps {
  title: string;
  icon: string;
  link: string;
}

function Navlink(props: NavlinkProps) {
  const { title, icon, link } = props;
  return (
    <Link
      href={link}
      className="group flex p-3 hover:bg-primary-500 cursor-pointer rounded"
    >
      <img alt={icon} src={icon} className="group-hover:invert-white" />
      <p className="ml-4">{title}</p>
    </Link>
  );
}

export default Navlink;
