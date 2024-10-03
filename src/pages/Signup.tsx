import Fading from "../components/ui/animation/Fading";
import { SignUpView } from "../features/authentication";

interface Props {}

export const SignUpPage: React.FC<Props> = () => {
  return (
    <Fading>
      <SignUpView />
    </Fading>
  );
};
