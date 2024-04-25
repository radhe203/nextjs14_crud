"use client";
import {useRouter} from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  async function handleSignup() {
    try {
      setError(false);
      setLoading(true);
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        setError(false);
        setSuccess("Signup successful");
        setLoading(false);
        router.push("/login");
      } else {
        setError(true);
        setSuccess("");
        setLoading(false);

      }
    } catch (error) {
      setError(true);
      setLoading(false);
      setSuccess("");
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" text-blue-500 font-bold text-2xl mb-5">{loading ? "Processing" : "Signup"}</h1>
      <label htmlFor="username" >username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={handleSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {disabled ? "No signup" : "Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
      <p className="text-red-500 font-semibold">{error ? "Something went wrong !! try again":""}</p>
    </div>
  );
};

export default SignUp;
