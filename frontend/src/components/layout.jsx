import { Outlet } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';

export const Layout = () => {
 
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <main>
        <Outlet />
      </main>

    </div>
  );
};