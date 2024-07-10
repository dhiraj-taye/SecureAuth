import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    try {
      dispatch(signInStart());
      const res = await fetch("/server/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response received", res);

      if (!res.ok) {
        const errorData = await res.json(); // Attempt to parse error message if available
        console.error("Login failed with status", res.status, errorData);
        dispatch(signInFailure(errorData));
        return;
      }

      try {
        const data = await res.json(); // Attempt to parse successful response
        console.log("Response data:", data);

        // if (!data.success) {
        //   console.log("Login failed:", data.message);
        //   dispatch(signInFailure(data));
        //   return;
        // }

        dispatch(signInSuccess(data));
        console.log("Login successful, navigating to home");
        navigate("/");
      } catch (error) {
        console.error("Error parsing JSON:", error);
        dispatch(signInFailure({ message: "Error parsing JSON response" }));
      }
    } catch (error) {
      console.log("Error during login:", error);
      dispatch(
        signInFailure({ message: "Network error or server unreachable" })
      );
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      {error && (
        <p className="text-red-700 mt-5">
          {error.message || "Something went wrong!"}
        </p>
      )}
    </div>
  );
}
