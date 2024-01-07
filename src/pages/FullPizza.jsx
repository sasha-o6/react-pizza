import { useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios'

export default function FullPizza() {
    const { pizzaId } = useParams();
    // console.log(params.pizzaId);

    useEffect(() => {

    }, pizzaId)

    return (
        <div>
            <h2>{pizzaId}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex numquam iusto corrupti quae optio accusamus, voluptate porro nisi culpa iste excepturi earum, at quasi tempore dicta amet hic ipsum repellat.</p>
            <h4>250 $</h4>
        </div>
    )
}
