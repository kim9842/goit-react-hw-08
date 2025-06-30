import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

const AuthNav = () => {
  const addActive = ({ isActive }) => (isActive ? s.active : s.link);

  return (
    <ul className={s.authList}>
      <li>
        <NavLink className={addActive} to="/login">
          Log In
        </NavLink>
      </li>
      <li>
        <NavLink className={addActive} to="/register">
          Register
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthNav;
