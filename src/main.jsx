import App from './App.jsx'
import './global.module.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Bills from "./pages/Bills/Bills.jsx";
import Exchange from "./pages/Exchange/Exchange.jsx";
import Login from "./pages/Login/Login.jsx";
import {createRoot} from "react-dom/client";
import BillInfo from "./pages/BillInfo/BillInfo.jsx";
import {Provider} from "react-redux";
import store from "./store/store.js";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    /*errorElement: <ErrorInfo />,*/
    children: [
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
