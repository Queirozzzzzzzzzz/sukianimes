import { useEffect, useRef } from "react";

export default function Register() {
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
    <div className="tecnical-form container register-form">
      <form action="/auth/accounts/signup" method="POST">
        <h1>Sign Up</h1>
        <div className="form-group">
          <input type="text" name="accountname" id="accountname" />
          <label htmlFor="accountname">Username</label>
        </div>
        <div className="form-group">
          <input type="email" name="email" id="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input type="password" name="password1" id="password1" />
          <label htmlFor="password1">Password</label>
        </div>
        <div className="form-group">
          <input type="password" name="password2" id="password2" />
          <label htmlFor="password2">Confirm Password</label>
        </div>
        <button>Enter</button>
      </form>
    </div>
  );
}
