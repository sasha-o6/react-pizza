import styles from './Pagination.module.scss';

export default function Pagination({ currentPage, onClicktPage }) {
    let pagItems = [1, 2, 3, 4]

    return (
        <div className={styles.paginationWrap}>
            {pagItems.map((button, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onClicktPage(index + 1)}
                    className={styles.pagButton + " " + (currentPage == index + 1 ? styles.pagButtonCurrent : null)}
                >{button}</button>
            ))}
        </div>
    )
}
