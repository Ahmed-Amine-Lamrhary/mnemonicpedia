import React, { useState } from "react";
import axios from "axios";
import Form from "../forms/Form";
import FormGroup from "../forms/GroupForm";
import { login } from "../../utility/auth";
import config from "../../utility/config";
import FormCheck from "../forms/FormCheck";
import Button from "../other/Button";
import FormNavigation from "../forms/FormNavigation";

function Login({ history, location }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);

  const handleLogin = async (e) => {
    const { data: token } = await axios.post(`${config.api}/auth`, {
      email,
      password,
      keepLogin,
    });

    // save user's token and redirect to dashboard
    login(token, history, "/me");
  };

  return (
    <div className="container">
      <FormNavigation
        links={[
          { to: "/register", text: "Register" },
          { to: "/login", text: "Log in" },
        ]}
      />

      <Form onSubmit={handleLogin} location={location}>
        <FormGroup
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormGroup
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormCheck
          label="Keep me logged in"
          id="keepLogin"
          checked={keepLogin}
          onChange={() => setKeepLogin(!keepLogin)}
        />

        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
}

export default Login;
