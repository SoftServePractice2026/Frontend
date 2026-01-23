import { Link } from "react-router-dom";
import { Divider } from "./Divider";
import clsx from "clsx";

interface Props {
  itemOnMenuClassName: string;
  onThemeClick: () => void;
}

export function MainMenu({ itemOnMenuClassName, onThemeClick }: Props) {
  return (
    <>
      <div className={clsx("block sm:hidden")}>
        <Link to="/" className={itemOnMenuClassName}>Увійти</Link>
        <Link to="/" className={itemOnMenuClassName}>Зареєструватися</Link>
      </div>

      <Divider className={clsx("block sm:hidden")}/>

      <div className={clsx("block lg:hidden")}>
        <Link to="/" className={itemOnMenuClassName}>Афіша</Link>
        <Link to="/" className={itemOnMenuClassName}>Скоро у кіно</Link>
        <Link to="/" className={itemOnMenuClassName}>Про нас</Link>
        <Link to="/" className={itemOnMenuClassName}>Допомога і контакти</Link>
      </div>

      <Divider className={clsx("block lg:hidden")}/>

      <button onClick={onThemeClick} className={itemOnMenuClassName}>
        <span>Тема</span>
        <span className="text-xs text-gray-500">›</span>
      </button>
    </>
  );
}