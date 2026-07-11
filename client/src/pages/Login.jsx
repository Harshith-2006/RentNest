import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/context/ToastContext";
import axios from "axios";

export default function Login() {

  const { toast } = useToast();

  const navigate = useNavigate();

  const [mode, setMode] = useState("renter");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  // LOGIN FUNCTION
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/user/login",
        {
          email,
          password
        }
      );

      // Store token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Store role
      localStorage.setItem(
        "role",
        response.data.user.role
      );

      // Store user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast({
        message: "Login Successful",
        type: "success",
      });

      // Redirect based on role
if (response.data.user.role === "owner") {

  navigate("/owner");

} else if (response.data.user.role === "admin") {

  navigate("/admin");

} else {

  navigate("/dashboard");

}
    } catch (error) {

      toast({
        message:
          error.response?.data?.message ||
          "Login Failed",
        type: "error",
      });

    }

  };


  return (

    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">

      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-slate-900/5 dark:bg-slate-900 dark:shadow-card-dark dark:ring-white/10 lg:grid-cols-2">

        <div className="relative hidden bg-gradient-to-br from-brand-600 to-teal-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wide text-brand-100">
              RentNest
            </p>

            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight">
              Sign in to manage trips, saves, and requests.
            </h1>

          </div>

          <p className="text-sm text-brand-100">
            Owners can switch to owner mode to manage listings and respond to renters.
          </p>

        </div>

        <div className="p-8 sm:p-10">

          <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
            Log in
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            No account?{" "}

            <Link
              to="/register"
              className="font-semibold text-brand-700 dark:text-brand-300"
            >
              Create one
            </Link>

          </p>

          <div className="mt-8 inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">

            <button
              type="button"
              onClick={() => setMode("renter")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                mode === "renter"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Renter
            </button>

            <button
              type="button"
              onClick={() => setMode("owner")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                mode === "owner"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Owner
            </button>

          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">

            <div>

              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-brand-500/30 focus:border-brand-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="you@example.com"
              />

            </div>

            <div>

              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-brand-500/30 focus:border-brand-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="••••••••"
              />

            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              Continue
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}