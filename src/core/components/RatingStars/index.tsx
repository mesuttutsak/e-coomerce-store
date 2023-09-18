import { useEffect, useState } from 'react'

import { AiTwotoneStar } from 'react-icons/ai';

import styles from "./ratingStars.module.scss";

const RatingStars = ({rating} : {rating:number}) => {
    const [ratingStarEls, setRatingStarEls] = useState<any>([]);

    useEffect(() => {
        let starELs = [];

        if (rating) {
            for (let i = 0; i < 5; i += 1) {
                
                if (i < Math.round(rating)) {
                    starELs.push(<AiTwotoneStar key={i + 'stars'} color="orange" />);
                } else {
                    starELs.push(<AiTwotoneStar key={i + 'stars'} color='#d3ccc5' />);
                }
            }
            setRatingStarEls(starELs)
        }

        return
    }, [rating]);

    return (
        <div className={styles.ratingStarsWrap}>{ratingStarEls?.map((item: any, i: number) => <div key={i + '_star'}>{item} </div>)}</div>
    )
}

export default RatingStars