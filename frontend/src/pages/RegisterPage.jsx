import { useState } from "react";
import { post } from "../utils/api";

export default function RegisterPage() {
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });

  async function submit() {
    await post("/auth/register", form);
    alert("Registered!");
  }

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, fullname: e.target.value })} />
      <br />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <br />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <br />
      <button onClick={submit}>Register</button>
    </div>
  );
}
