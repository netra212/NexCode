import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    // Now submit the forms to the backend.
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="min-h-screen flex flex-col justify-center items-center gap-y-3"
      >
        <input
          type="text"
          value={name}
          placeholder="Enter your firstname"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="passsword"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Signup;
