import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserCardProps {
  username: string;
  name: string;
  image?: string;
}

function UserCard(props: UserCardProps) {
  const { username, name, image } = props;
  return (
    <div className="flex">
      <div>
        <Avatar className="bg-orange-600 h-14 w-14 mr-3 text-2xl">
          <AvatarImage alt="image" src={image} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-lg">{name}</p>
        <p className="text-[#7878A3] text-base ">@{username}</p>
      </div>
    </div>
  );
}

export default UserCard;
