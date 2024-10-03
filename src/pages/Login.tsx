import Fading from "../components/ui/animation/Fading";
import { LoginView } from "../features/authentication";

const Login = () => {
  return (
    <>
      <Fading>
        <LoginView />
      </Fading>
    </>
  );
};

export default Login;
