import { Search } from "lucide-react";
import React from "react";
import { Filter, UserCard } from "../../components";

let data = [
  {
    post: "user",
    _id: "67f305aa5ba403eaf14615c6",
    firstName: "salem",
    lastName: "fray",
    email: "salem.fray@example.com",
    picture: "avatar.png",
    active: true,
    role: "admin",
    createdAt: "2025-04-06T22:52:26.275Z",
    updatedAt: "2025-04-06T23:02:07.796Z",
    
    id: "67f305aa5ba403eaf14615c6",
  },
  {
    post: "user",
    _id: "67f305aa5ba403eaf14615c6",
    firstName: "Mahemmed",
    lastName: "Sallemi",
    email: "salem.fray@example.com",
    picture: "ee9330e0-133a-11f0-8b7e-bf605f65a28b.jpeg",
    active: true,
    role: "admin",
    createdAt: "2025-04-06T22:52:26.275Z",
    updatedAt: "2025-04-06T23:02:07.796Z",
    
    id: "67f305aa5ba403eaf14615c6",
  },
  {
    post: "user",
    _id: "67f305aa5ba403eaf14615c6",
    firstName: "salem",
    lastName: "fray",
    email: "salem.fray@example.com",
    picture: "ee9330e0-133a-11f0-8b7e-bf605f65a28b.jpeg",
    active: true,
    role: "admin",
    createdAt: "2025-04-06T22:52:26.275Z",
    updatedAt: "2025-04-06T23:02:07.796Z",
    
    id: "67f305aa5ba403eaf14615c6",
  },
  {
    post: "user",
    _id: "67f305aa5ba403eaf14615c6",
    firstName: "salem",
    lastName: "fray",
    email: "salem.fray@example.com",
    picture: "ee9330e0-133a-11f0-8b7e-bf605f65a28b.jpeg",
    active: true,
    role: "admin",
    createdAt: "2025-04-06T22:52:26.275Z",
    updatedAt: "2025-04-06T23:02:07.796Z",
    
    id: "67f305aa5ba403eaf14615c6",
  },
  {
    post: "user",
    _id: "67f305aa5ba403eaf14615c6",
    firstName: "salem",
    lastName: "fray",
    email: "salem.fray@example.com",
    picture: "ee9330e0-133a-11f0-8b7e-bf605f65a28b.jpeg",
    active: true,
    role: "admin",
    createdAt: "2025-04-06T22:52:26.275Z",
    updatedAt: "2025-04-06T23:02:07.796Z",
    
    id: "67f305aa5ba403eaf14615c6",
  },
  {
    post: "user",
    _id: "67f305aa5ba403eaf14615c6",
    firstName: "salem",
    lastName: "fray",
    email: "salem.fray@example.com",
    picture: "ee9330e0-133a-11f0-8b7e-bf605f65a28b.jpeg",
    active: true,
    role: "admin",
    createdAt: "2025-04-06T22:52:26.275Z",
    updatedAt: "2025-04-06T23:02:07.796Z",
    
    id: "67f305aa5ba403eaf14615c6",
  },
];

const Users = () => {
  const fetchData = async () => {};
  return (
    <div className="flex flex-col gap-4">
      <Filter />
      <div className="grid grid-cols-4 gap-4">
        {data.map((item, idx) => (
          <UserCard key={idx} data={item} fetchData={fetchData} />
        ))}
      </div>
    </div>
  );
};

export default Users;
