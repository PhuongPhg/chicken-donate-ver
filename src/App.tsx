import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "routes/AppRoutes";
import { ConnectWallet } from "ethereum";

function App() {
  const fetchData = async () => {
    const signer = await ConnectWallet();
    console.log(signer?.provider);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
