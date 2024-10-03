import { createContext, useState } from "react";

// Step 1: Create the context
export const AddClientFormContext = createContext(
  {} as {
    disabled: boolean;
    setDisabled: (disabled: boolean) => void;
  }
);

// Step 2: Create the provider component
export function AddClientProvider({ children }: { children: React.ReactNode }) {
  const [disabled, setDisabled] = useState(false);

  return <AddClientFormContext.Provider value={{ disabled, setDisabled }}>{children}</AddClientFormContext.Provider>;
}
