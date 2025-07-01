import { useDispatch, useSelector } from "react-redux";
import s from "./UserMenu.module.css";
import { logoutThunk } from "../../redux/auth/operations";
import { Slide, toast } from "react-toastify";
import { selectUserName } from "../../redux/auth/selectors";

const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      toast("Goodbye, hope to see you again soon!", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Slide,
      });
    } catch (error) {
      console.error(error);
      toast("Something went wrong, please try again", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  return (
    <div className={s.authList}>
      <span className={s.username}>Welcome, {userName}</span>
      <button type="button" onClick={handleLogout} className={s.button}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
