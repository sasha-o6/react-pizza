import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import PizzaBlock from "../components/PizzaBlock";

export default function FullPizza() {
    const { pizzaId } = useParams();
    const navigate = useNavigate();
    const [pizza, setPizza] = useState()


    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get("+https://6555464d63cafc694fe79d8e.mockapi.io/items/" + pizzaId);
                console.log(pizza, data);
                setPizza(data);

            } catch (error) {
                // setPizza([error])
                // alert(error)
                navigate("/")
            }
        }

        fetchPizza()
    }, []);

    if (!pizza) return "please wait"

    return (
        <>
            <img src={pizza.imageUrl} alt="pizza" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} $</h4>
        </>
    )
}
