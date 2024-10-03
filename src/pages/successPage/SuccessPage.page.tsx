import AnimationSuccess from "@myCash/components/ui/animation/AnimationSuccess";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/"); // Use navigate as a function
    }, 3000);
  }, [navigate]);

  return <AnimationSuccess />;
}
