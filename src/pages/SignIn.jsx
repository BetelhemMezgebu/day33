import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignIn() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim()) {
      return;
    }

    login(username.trim());
    navigate("/checkout");
  }

  return (
    <div>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="Enter your name"
          />
        </label>

        <br />
        <br />

        <button type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;