import styles from "./header.module.scss";

import Text from "../Text";
import Basket from "../Basket";
import { NavLink } from "react-router-dom";
import { SiHomeassistantcommunitystore } from "react-icons/si";

const Header = () => {
  return (
    <header>
      <div className='_container'>
        <div className={styles.headerWrap}>
          <span className={styles.headerWrapLeft}>
            {/* <Text fontWeight="bold" fontSize="lg" tag="h1">Dataguess E-commerce Case</Text> */}
            <nav>
              <NavLink className={({ isActive, isPending }) => isPending ? styles.pending : isActive ? styles.active : ""} to={'/'}><SiHomeassistantcommunitystore/> <Text tag="h2" lineHeight="none" fontWeight="semibold">Products</Text></NavLink>
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