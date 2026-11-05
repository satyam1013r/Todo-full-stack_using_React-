
import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm({ onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__group">
        <label className="login-form__label" htmlFor="email">
          Email
        </label>

        <input
          className="login-form__input"
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="login-form__group">
        <label className="login-form__label" htmlFor="password">
          Password
        </label>

        <input
          className="login-form__input"
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>

      {error && (
        <p className="login-form__error">{error}</p>
      )}

      <button
        className="login-form__submit"
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="login-form__footer">
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </form>
  );
}

export default LoginForm;
