import App from './App.jsx';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Bills from "./pages/Bills/Bills.jsx";
import Exchange from "./pages/Exchange/Exchange.jsx";
import Login from "./pages/Login/Login.jsx";
import {createRoot} from "react-dom/client";
import BillInfo from "./pages/BillInfo/BillInfo.jsx";
import {Provider} from "react-redux";
import store from "./store/store.js";
import ErrorInfo from "./pages/ErrorInfo/ErrorInfo.jsx";
import Main from "./pages/Main/Main.jsx";

const router = createBrowserRouter([
  {
    element: <App/>,
    errorElement: <ErrorInfo />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "bills",
        element: <Bills/>,
      },
      {
        path: "bills/:billId",
        element: <BillInfo/>,
        loader: ({params}) => params,
      },
      {
        path: "exchange",
        element: <Exchange/>,
      },
      {
        path: "login",
        element: <Login/>,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <Provider store={store} >
      <RouterProvider router={router}/>
    </Provider>
)
