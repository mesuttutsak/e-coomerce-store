import styles from "../productsPageDetailSections.module.scss";

const DetailImage = ({ src, alt } : { src: string; alt: string }) => {
    return (
        <div className={styles.detailImg}>
            <img src={src} alt={alt} />
        </div>
    )
}

export default DetailImage