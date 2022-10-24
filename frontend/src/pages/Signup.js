import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(firstName, lastName, email, password, address, age, gender);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Signup</h3>

      <label>Firstname:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <label>Lastname:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label>Address:</label>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />
      <label>Age:</label>
      <input
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
      />
      <label>Gender:</label>
      <input
        type="text"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
