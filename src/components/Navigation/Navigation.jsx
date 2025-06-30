import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const addActive = ({ isActive }) => (isActive ? s.active : s.link);

  return (
    <div className={s.navBar}>
      <NavLink className={addActive} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={addActive} to="/contacts">
          Contacts
        </NavLink>
      )}
    </div>
  );
};

export default Navigation;
