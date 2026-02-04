import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/travel-logo.png";

export default function Layout() {

  return (
    <div className="layout">
      <header className="navbar">
      <nav className="nav-links">
        <NavLink 
          to="/countries">Lijst met Landen</NavLink>
        <NavLink 
          to="/planner">Planner/favorieten</NavLink>
        <NavLink 
          to="/book/:code">Geboekt</NavLink>
      </nav>
      </header>
      <img
          src={logo}
          alt="Travel Logo"
          style={{ width: 400, display: "flex", margin: "0 auto" }}
        />
     <div className="main-page">   
    <Outlet />
    </div>
    </div>
  );
}




