
// import { Children } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./component/Footer/Footer";
import Navbar from "./component/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import "./App.scss"

//this layout will be used to all pages and we want every pages to have navbar and footer, so we used react oulet which hold the center pages
//while above and bottom is our navbar and footer 
const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

// using this router we can directly jump to pages bu just setting like this
const router = createBrowserRouter([
  // we use the Layout component above that act as the parent with its children 
  //and using this our navbar and footer will display always on every pages
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
    ],
  },
]);
// using router provider to wrap the app div 
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
