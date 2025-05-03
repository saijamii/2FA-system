import { loginUser, register } from "@/service/authApi";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function LoginForm({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
    resetForm();
    setError("");
    setMessage("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await register(username, password);
      setMessage(data.message);
      setIsRegister(!isRegister);
      resetForm();
      setError("");
    } catch (error) {
      console.log("The Error is : ", error.message);
      setError("something went wrong during user registration");
      resetForm();
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await loginUser(username, password);
      onLoginSuccess(data);
      resetForm();
      setError("");
    } catch (error) {
      console.log("The Error is : ", error.message);
      setError("Invalid login");
      resetForm();
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={isRegister ? handleRegister : handleLogin}
      className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto mt-20 p-6"
    >
      <h2 className="text-3xl text-center font-light mb-6">
        {isRegister ? "CreateAccount" : "Login"}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          label="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          label="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      {isRegister && (
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            label="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
      )}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-3">{message}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        {isRegister ? "Register" : "Log In"}
      </button>

      <div>
        <p className="pt-4 text-center text-gray-600 text-sm">
          {isRegister
            ? "Already have an account ? "
            : "Don't have an account ? "}

          <Link
            onClick={() => {
              handleRegisterToggle();
            }}
            className="text-blue-600"
          >
            {isRegister ? "Log In" : "Register"}
          </Link>
        </p>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};
