import styles from "../productsPageDetailSections.module.scss";

const DetailImage = ({ src, alt } : { src: string; alt: string }) => {
    return (
        <div className={styles.detailImg}>
            <img src={src} alt={alt} width={'100%'} />
        </div>
    )
}

export default DetailImage