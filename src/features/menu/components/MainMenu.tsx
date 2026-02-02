import { Link } from "react-router-dom";
import { Divider } from "./Divider";
import clsx from "clsx";
import { useAuth } from "@/app/providers/AuthProvider";

interface Props {
  itemOnMenuClassName: string;
  onThemeClick: () => void;
}

export function MainMenu({ itemOnMenuClassName, onThemeClick }: Props) {

  const { isAuth, logout } = useAuth();

  return (
    <>
      <div className={clsx("block sm:hidden")}>
        {!isAuth ? (
          <>
            <Link to="/login" className={itemOnMenuClassName}>Увійти</Link>
            <Link to="/registration" className={itemOnMenuClassName}>Зареєструватися</Link>
          </>
        ) : (
          <>
            <button onClick={logout} className={itemOnMenuClassName}>Вийти</button>
          </>
        )}
      </div>

      <Divider className={clsx("block sm:hidden")} />

      <div className={clsx("block lg:hidden")}>
        <Link to="/" className={itemOnMenuClassName}>Афіша</Link>
        <Link to="/" className={itemOnMenuClassName}>Скоро у кіно</Link>
        <Link to="/" className={itemOnMenuClassName}>Про нас</Link>
        <Link to="/" className={itemOnMenuClassName}>Допомога і контакти</Link>
      </div>

      <Divider className={clsx("block lg:hidden")} />

      <button onClick={onThemeClick} className={itemOnMenuClassName}>
        <span>Тема</span>
        <span className="text-xs text-gray-500">›</span>
      </button>
    </>
  );
}