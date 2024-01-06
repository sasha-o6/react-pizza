export default function Categories(props) {
    const categories = ["Все", "Мясные", 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, index) => (<li
                        key={index}
                        onClick={() => props.setCategoryID(index)}
                        className={props.categoryID * 1 === index ? "active" : ""}
                    >{value}</li>
                    ))
                }
            </ul>
        </div>
    );
}
