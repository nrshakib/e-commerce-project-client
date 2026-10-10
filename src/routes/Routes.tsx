import { createBrowserRouter } from "react-router-dom";
import ProductDetailsPage from "../pages/ProductDetails";
import Products from "../pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <ProductDetailsPage />,
  },
  //   {
  //     path: "*",
  //     element: <NotFoundPage />,
  //   },
]);

export default router;
