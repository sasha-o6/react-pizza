import styles from './NotFoundBlock.module.scss';

export default function NotFoundBlock(props) {
    return (
        <div className={styles.root}>
            <h1 className={styles.smile}>😕</h1>
            <h1>Not Found</h1>
        </div>
    )
}