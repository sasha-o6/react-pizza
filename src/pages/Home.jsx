import qs from "qs"

import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryID, setCurrentPage, setcurrentSelected, setFilters } from '../redux/slices/filterSlice';
import { setItems, fetchPizzas } from '../redux/slices/pizzasSlice';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from "../App"

export default function Home(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { searchValue, categoryID, currentPage, sort: currentSelected } = useSelector(state => state.filter)
  const { items, status } = useSelector(state => state.pizzas)

  const onClickCategory = (id) => dispatch(setCategoryID(id));
  const onClicktSelected = (obj) => dispatch(setcurrentSelected(obj));
  const onClicktPage = (int) => dispatch(setCurrentPage(int));

  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const { searchValue } = useContext(SearchContext);

  const isFirstLoad = useRef(true);

  const fetchRequest = async () => {
    // setIsLoading(false)
    // const fetchHref = new URL('https://6555464d63cafc694fe79d8e.mockapi.io/items');

    // fetchHref.searchParams.append('search', searchValue + "");
    // fetchHref.searchParams.append('limit', 4);
    // fetchHref.searchParams.append('page', currentPage)
    // if (categoryID > 0) fetchHref.searchParams.append('category', categoryID)
    // fetchHref.searchParams.append('sortBy', currentSelected.sortProperty);
    // fetchHref.searchParams.append('order', currentSelected.order);

    // dispatch(fetchPizzas(fetchHref))



    const fetchParams = {};

    fetchParams.search = searchValue + "";
    fetchParams.limit = 4;
    fetchParams.page = currentPage;
    fetchParams.category = '';
    if (categoryID > 0) fetchParams.category = categoryID;
    fetchParams.sortBy = currentSelected.sortProperty;
    fetchParams.order = currentSelected.order;

    dispatch(fetchPizzas(fetchParams));


    // fetch(fetchHref)
    //   .then(res => res.json())
    //   .then(
    //     json => {
    //       setItems(json)
    //       setIsLoading(true)
    //     }
    //   )

    // await axios.get(fetchHref)
    //   .then(res => {
    //     setItems(res.data)
    //     setIsLoading(true)
    //     console.log(6666);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   })

    // try {
    //   // const res = await axios.get(fetchHref)
    //   // const { data } = await axios.get(fetchHref)
    //   dispatch(fetchPizzas(fetchHref))
    //   // setIsLoading(true)
    // } catch (error) {
    //   setIsLoading(false)
    //   console.error(error);
    // } finally {
    //   console.log("finished");
    // }
  }

  // const [currentPage, setCurrentPage] = useState(1);

  // categories State
  // const [categoryID, setCategoryID] = useState(0);

  // sort State
  // const [currentSelected, setcurrentSelected] = useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  //   order: "desc"
  // });

  // https://6555464d63cafc694fe79d8e.mockapi.io/items

  useEffect(() => {
    if (window.location.search !== "") {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(obj => (obj.sortProperty === params.sortBy && obj.order === params.order))

      dispatch(setFilters({
        params,
        sort
      }))
    } else {
      fetchRequest();
    }
  }, [])

  useEffect(() => {
    if (isFirstLoad.current !== true) {
      const queryString = qs.stringify({
        limit: 30,
        page: currentPage,
        sortBy: currentSelected.sortProperty,
        order: currentSelected.order,
        categoryID,
      })

      navigate(`?${queryString}`)
    }
  }, [categoryID, currentSelected, searchValue, currentPage])

  useEffect(() => {
    if (isFirstLoad.current !== true) fetchRequest()
    isFirstLoad.current = false
  }, [categoryID, currentSelected, searchValue, currentPage])

  // задачка, зробили фільтр який не буде прив'язаний до самих слів, а буде прив'язаний до символів 
  // Задача: 
  //  вхідні дані: "фівпр"
  //  якщо у стрічці є символи "ф", "і", "в", "п", "р" без різниці у якому саме місці вони стоять, то повертати true, у іншому випадку false    

  return (
    <>
      <div className="content__top">
        <Categories categoryID={categoryID} setCategoryID={onClickCategory} />
        <Sort currentSelected={currentSelected} onClicktSelected={onClicktSelected} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error'
          ? (<div className="">
            <h2>Корзина пуста</h2>
          </div>)
          : (<div className="content__items">
            {
              status === 'loading'
                ? [...new Array(3)].map((_, index) => <Skeleton key={index} />)
                : items.map((pizza, index) => {
                  return <PizzaBlock key={index} pizza={pizza} />
                })
            }
          </div>)
      }

      {/* {
              items.map((pizza, index) => {
                return <Skeleton key={index} pizza={pizza} />
              })
            } */}

      {/* 
              якщо не передавати все разом, а передавати окремими файлами, то можна написати
              pizzas.map((pizza, index) => (
                <PizzaBlock key={index} {...pizza} />
              ))
            */}
      <Pagination currentPage={currentPage} onClicktPage={onClicktPage} />
    </>
  )
}