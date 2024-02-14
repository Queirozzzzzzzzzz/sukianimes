import { useEffect, useRef } from "react";

export default function Login() {
  const inputsRef = useRef([]);

  useEffect(() => {
    const handleInputChange = (e) => {
      const inputId = e.target.id;
      const inputElement = document.getElementById(inputId);
      const labelElement = document.querySelector(
        `label[htmlFor='${inputId}']`,
      );

      if (e.target.value !== "") {
        labelElement.style.fontSize = "1.5em";
        labelElement.style.color = "var(--purple-second)";
        inputElement.style.borderColor = "var(--purple-base)";
      } else {
        labelElement.style.fontSize = "";
        labelElement.style.color = "";
        labelElement.style.margin = "";
        inputElement.style.borderColor = "";
      }
    };

    const inputs = [
      "username",
      "email",
      "password",
      "password-1",
      "password-2",
    ];
    inputsRef.current = inputs;

    inputs.forEach((inputId) => {
      const inputElement = document.getElementById(inputId);
      if (inputElement) {
        inputElement.addEventListener("input", handleInputChange);
      }
    });

    return () => {
      inputs.forEach((inputId) => {
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
          inputElement.removeEventListener("input", handleInputChange);
        }
      });
    };
  }, []);

  return (
    <div className="tecnical-form container login-form">
      <form action="/auth/accounts/login" method="POST">
        <h1>Login</h1>
        <div className="form-group">
          <input type="email" name="email" id="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input type="password" name="password" id="password" />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
