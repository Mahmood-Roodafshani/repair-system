import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import App from './App';
import { SidebarProvider } from './contexts/SidebarContext';
import { ToastContainer } from 'react-toastify';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
    <ToastContainer position="bottom-right" />
  </HelmetProvider>,
  document.getElementById('root')
);

// serviceWorker.unregister();
