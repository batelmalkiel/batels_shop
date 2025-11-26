import { FC } from "react";
import { NavLink } from "react-router-dom";
import { routes, Page } from "../../router/paths";

export const Navbar: FC = () => {
  return (
    <nav className="jumbotron jumbotron-fluid bg-info text-light p-0 pt-5">
      <h1>Batel's jewlery shop </h1>

      <ul className="nav nav-tabs">
        {routes
          .filter((route: Page) => route.isShown)
          .map((route: Page) => (
            <li className="nav-item" key={route.name}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  [isActive ? "active" : "text-light", "nav-link"].join(" ")
                }
              >
                {route.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
};
