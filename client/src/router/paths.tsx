// src/router/paths.tsx
import { Home } from "../views/Home";
import { Products } from "../views/Products";
import { Cart } from "../views/Cart";
import { Checkout } from "../views/Checkout";
import { Orders } from "../views/Orders";
import { OrderDetail } from "../views/OrderDetail";
import { Login } from "../views/login";
import { Register } from "../views/register";
import { Layout } from "../views/Layout";

export interface Page {
  path: string;
  element: JSX.Element;
  name: string;
  isShown: boolean;
  requiresAuth?: boolean;
}

export const routes: Page[] = [
  {
    path: "/",
    element: <Home />,
    name: "בית",
    isShown: true,
  },
  {
    path: "/products",
    element: <Products />,
    name: "תכשיטים",
    isShown: true,
  },
  {
    path: "/cart",
    element: <Cart />,
    name: "עגלה",
    isShown: true,
  },
  {
    path: "/orders",
    element: <Orders />,
    name: "ההזמנות שלי",
    isShown: true,
    requiresAuth: true,
  },
  {
    path: "/checkout",
    element: <Checkout />,
    name: "תשלום",
    isShown: false,
    requiresAuth: true,
  },
  {
    path: "/orders/:id",
    element: <OrderDetail />,
    name: "פרטי הזמנה",
    isShown: false,
    requiresAuth: true,
  },
  {
    path: "/login",
    element: <Login />,
    name: "התחבר",
    isShown: false,
  },
  {
    path: "/register",
    element: <Register />,
    name: "הירשם",
    isShown: false,
  },
];

export const paths = [
  {
    path: "/",
    element: <Layout />,
    children: routes.map((route) => ({
      path: route.path,
      element: route.element,
    })),
  },
];