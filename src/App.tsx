import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from 'routes/AppRoutes';
import { ConnectWallet } from 'ethereum';
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

function App() {
  const fetchData = async () => {
    await ConnectWallet();
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
