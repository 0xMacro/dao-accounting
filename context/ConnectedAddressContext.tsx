import { useState, createContext } from "react";

const ConnectedAddressContext = createContext([] as any);

type ProviderProps = {
  children: React.ReactNode;
};

export const ConnectedAddressProvider = ({ children }: ProviderProps) => {
  const [connectedAddress, setConnectedAddress] = useState("");

  return (
    <ConnectedAddressContext.Provider
      value={[connectedAddress, setConnectedAddress]}
    >
      {children}
    </ConnectedAddressContext.Provider>
  );
};

export default ConnectedAddressContext;
