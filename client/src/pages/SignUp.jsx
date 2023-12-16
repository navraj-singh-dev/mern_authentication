import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    // event object is being passed as argument and target.id is coming from <input> tag's attribute.
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      // Check if the response has the expected success message
      if (data.message === "new user created successfully") {
        setErrors({}); // Clear any previous errors
        setSuccessMessage(
          "Sign-up was successful! Redirecting to Sign-In Page..."
        );

        // Redirect after a delay
        setTimeout(() => {
          navigate("/sign-in");
        }, 4000);
      }
      if (data.errors && data.errors.length > 0) {
        const errorObj = {};
        data.errors.forEach((error) => {
          errorObj[error.path] = error.msg;
        });
        setErrors(errorObj);
        return;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-300 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-300 p-3 rounded-lg"
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-300 p-3 rounded-lg"
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Signing You Up...💫" : "Sign Up"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>

      <div className="bg-red-800 mt-5 rounded-lg shadow-lg hover:shadow-amber-500/40">
        <p className="text-white text-lg text-center font-light antialiased">
          {error && "Something Went Wrong 🥺"}
        </p>
      </div>
      {successMessage && (
        <div className="bg-gray-700 mt-5 rounded-lg shadow-lg hover:shadow-amber-500/40">
          <p className="text-green-500 text-lg font-medium text-center p-4">{successMessage}</p>
        </div>
      )}
    </div>
  );
}
