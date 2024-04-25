'use client'
import {useRouter} from "next/navigation";
import { useState } from "react";
import Link from "next/link";
const profile = () => {
  const [data, setData] = useState();
  const router = useRouter();

  async function getData() {
    try {
      const response = await fetch("/api/users/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials:'include'
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setData(data.data._id);
        setTimeout(() => {
          router.push(`/profile/${data.data._id}`);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function logOut() {
    const res = await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      router.push("/login");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" text-blue-500 font-bold text-2xl mb-5">Profile</h1>
     
      <button
        onClick={logOut}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={getData}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        GetUser Details
      </button>
      {data && (
        <div>
          <p className=" text-red-400 font-semibold"><span className=" text-white font-normal text-sm mr-2">User Id:</span> {data}</p>
        </div>
      )}
    </div>
  );
};

export default profile;
