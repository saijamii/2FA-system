import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/context/SessionContext";
import { logOutUser } from "@/service/authApi";

export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useSession();

  const handleLogOut = async () => {
    try {
      const { data } = await logOutUser();
      logout(data);
      navigate("/login");
    } catch (error) {
      console.log("Error :", error.message);
    }
  };
  return (
    <div className="p-6 bg-white roundeed-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Welcome, {user.username}!</h2>
      <p>You have successfully logged in and verified your 2FA</p>
      <button
        type="button"
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
}
