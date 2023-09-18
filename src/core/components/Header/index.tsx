import styles from "./header.module.scss";

import { RiMenuFoldLine, RiMenuUnfoldFill } from "react-icons/ri";
import Text from "../Text";
import Basket from "../Basket";
import { NavLink, useLocation } from "react-router-dom";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import Button from "../Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch();
  const { openFiltering } = useSelector((state: any) => state);

  useEffect(() => {
    !location.pathname.split('/').every(item => item === "/" || item === "") && dispatch({ type: "setOpenFiltering", payload: true });
  }, [])

  return (
    <header>
      <div className='_container'>
        <div className={styles.headerWrap}>
          <span className={styles.headerWrapLeft}>
            {location.pathname.split('/').every(item => item === "/" || item === "") &&
              <div className={styles.mobileBtnCont}>
                <Button className={[styles.mobileBtn]} onClick={() => dispatch({ type: "setOpenFiltering", payload: true })}>{openFiltering ? <RiMenuFoldLine size={34} color="#9ca3af" /> : <RiMenuUnfoldFill size={34} color="#9ca3af" />}</Button>
              </div>
            }

            <nav>
              <NavLink className={({ isActive, isPending }) => isPending ? styles.pending : isActive ? styles.active : ""} to={'/'}><SiHomeassistantcommunitystore /> <Text tag="h2" lineHeight="none" fontWeight="semibold">Products</Text></NavLink>
            </nav>
          </span>

          <span className={styles.right}>
            <Basket />
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header