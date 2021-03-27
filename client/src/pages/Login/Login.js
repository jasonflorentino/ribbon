import FadeIn from "react-fade-in";
import FormLogin from "../../components/FormLogin/FormLogin"
import Header from "../../components/Header/Header"
import "./Login.scss";

function Login()
{
  return (
    <>
      <div className="Login">
        <FadeIn>
          <Header color="negative" login={false} signUp={true} />
          <main className="Login__main">
            <FormLogin />
          </main>
        </FadeIn>
      </div>
    </>
  )
}

export default Login;