import { Database } from "lucide-react";
import React from "react";

const NoData = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[40vh]">
      <div className="text-gray-500">
      <Database size={60} strokeWidth={1.25} />
      </div>
      <h1 className="text-gray-500 font-medium">Aucune donnée disponible</h1>
    </div>
  );
};

export default NoData;
