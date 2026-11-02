import RegisterForm from "../components/RegisterForm"

function RegisterPage() {
  return (
    <main className="register-page">
      <div className="register-page__container">
      <h1 className="register-page__title">
        Create an account
        </h1>
      <p  className="register-page__description">
        Register to start managing your todos.
        </p>
        
      <RegisterForm/>

      </div>
    </main>
  )
}

export default RegisterPage