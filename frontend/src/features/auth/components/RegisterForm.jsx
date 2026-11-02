import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState("");

  const { register, loading, error , clearError } = useRegister(); // import 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    clearError()

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    const { confirmPassword, ...registerData } = formData;// extract it we dont need in backend 

    const result = await register(registerData);// send to backend 

    if (result) {
      navigate("/login");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="register-form__group">
        <label className="register-form__label" htmlFor="username">
          Username
        </label>
        <input
          className="register-form__input"
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
      </div>

      <div className="register-form__group">
        <label className="register-form__label" htmlFor="email">
          Email
        </label>
        <input
          className="register-form__input"
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="register-form__group">
        <label className="register-form__label" htmlFor="password">
          Password
        </label>
        <input
          className="register-form__input"
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="register-form__group">
        <label className="register-form__label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="register-form__input"
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />
      </div>

      {validationError && (
        <p className="register-form__error">{validationError}</p>
      )}

      {error && (
        <p className="register-form__error">{error}</p>
      )}

      <button
        className="register-form__submit"
        type="submit"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="register-form__footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

export default RegisterForm;
