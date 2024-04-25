"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setToken(token);
  }, []);

  async function verify() {
    const res = await fetch("/api/users/verifyemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (res.ok) {
      setVerified(true);
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {!verified && <button onClick={verify} className="text-4xl bg-green-400 px-4 py-2 text-white">Verify Email</button>}
    
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
