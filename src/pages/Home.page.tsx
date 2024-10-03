import { ProductModal } from "../common";
import { HomeContent } from "../components";
import Fading from "../components/ui/animation/Fading";
import { BeginShiftModalHoc } from "../hoc/beginShiftModal";

interface Props {}

const HomePage: React.FC<Props> = () => {
  return (
    <Fading>
      <HomeContent />
      <ProductModal />
      <BeginShiftModalHoc />
    </Fading>
  );
};
export default HomePage;
