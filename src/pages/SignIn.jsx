import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    localStorage.setItem(
      "addisEatsUser",
      JSON.stringify({
        email,
      })
    );

    const destination =
      location.state?.from || "/checkout";

    navigate(destination);
  }

  return (
    <div>
      <h1>Sign In</h1>

      <p>
        Please sign in to continue to checkout.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
          </label>

          <br />

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter your email"
          />
        </div>

        <br />

        <div>
          <label htmlFor="password">
            Password
          </label>

          <br />

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
          />
        </div>

        <br />

        <button type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;