import React from "react";

const detail = ({ params }:any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <h1 className=" text-blue-500 font-bold text-2xl mb-5">Profile</h1>
    
      <p className="text-4xl">
        Profile page
        <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
};

export default detail;
