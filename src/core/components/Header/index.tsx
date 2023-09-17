import styles from "./header.module.scss";

import Text from "../Text";
import Basket from "../Basket";

const Header = () => {
  return (
    <header>
      <div className='_container'>
        <div className={styles.headerWrap}>
          <span className={styles.left}>
            <Text fontWeight="bold" fontSize="lg" tag="h1">Dataguess E-commerce Case</Text>
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