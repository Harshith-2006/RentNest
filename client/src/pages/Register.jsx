import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/context/ToastContext";
import axios from "axios";

export default function Register() {

  const { toast } = useToast();

  const navigate = useNavigate();

  const [role, setRole] = useState("renter");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  // REGISTER FUNCTION
  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://rentnest-fako.onrender.com/user/register",
        {
          name,
          email,
          password,

          // Convert renter → user
          role: role === "renter"
            ? "user"
            : "owner"
        }
      );

      toast({
        message: response.data.message,
        type: "success",
      });

      navigate("/login");

    } catch (error) {

      toast({
        message:
          error.response?.data?.message ||
          "Registration Failed",
        type: "error",
      });

    }

  };


  return (

    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-card ring-1 ring-slate-900/5 dark:bg-slate-900 dark:shadow-card-dark dark:ring-white/10 sm:p-10">

        <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Already registered?{" "}

          <Link
            to="/login"
            className="font-semibold text-brand-700 dark:text-brand-300"
          >
            Log in
          </Link>

        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <fieldset>

            <legend className="text-sm font-medium text-slate-700 dark:text-slate-200">
              I am joining as
            </legend>

            <div className="mt-3 grid grid-cols-2 gap-2">

              <label
                className={`cursor-pointer rounded-xl border px-3 py-3 text-center text-sm font-semibold transition ${
                  role === "renter"
                    ? "border-brand-500 bg-brand-50 text-brand-900 dark:bg-brand-950/40 dark:text-brand-100"
                    : "border-slate-200 hover:border-brand-300 dark:border-slate-700"
                }`}
              >

                <input
                  type="radio"
                  name="role"
                  className="sr-only"
                  checked={role === "renter"}
                  onChange={() => setRole("renter")}
                />

                Renter

              </label>

              <label
                className={`cursor-pointer rounded-xl border px-3 py-3 text-center text-sm font-semibold transition ${
                  role === "owner"
                    ? "border-brand-500 bg-brand-50 text-brand-900 dark:bg-brand-950/40 dark:text-brand-100"
                    : "border-slate-200 hover:border-brand-300 dark:border-slate-700"
                }`}
              >

                <input
                  type="radio"
                  name="role"
                  className="sr-only"
                  checked={role === "owner"}
                  onChange={() => setRole("owner")}
                />

                Owner

              </label>

            </div>

          </fieldset>

          <div>

            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Full name
            </label>

            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Password
            </label>

            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />

            <p className="mt-1 text-xs text-slate-500">
              At least 8 characters.
            </p>

          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            Create account
          </button>

        </form>

      </div>

    </div>

  );

}
