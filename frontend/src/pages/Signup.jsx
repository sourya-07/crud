import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    course: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Signup</h2>

        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {form.role === "student" && (
          <input placeholder="Course" onChange={(e) => setForm({ ...form, course: e.target.value })} />
        )}

        <button type="submit">Signup</button>
        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "0.9rem", color: "#aaa" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
