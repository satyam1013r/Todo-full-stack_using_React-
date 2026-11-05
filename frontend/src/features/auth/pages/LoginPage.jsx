
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import useLogin from "../hooks/useLogin";

function LoginPage() {
  const { handleLogin, loading, error } = useLogin();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const user = await handleLogin(formData);

    if (user) {
      navigate("/todos", { replace: true });
    }
  };

  return (
    <main className="login-page">
      <div className="login-page__container">
        <h1 className="login-page__title">
          Welcome Back
        </h1>

        <p className="login-page__description">
          Login to manage your todos.
        </p>

        <LoginForm // pass this to login form
          onSubmit={onSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </main>
  );
}

export default LoginPage;
