import { useContext, useRef, useState, useCallback } from "react"
// import { useEffect } from "react"
import debounce from 'lodash.debounce';
import styles from "./Search.module.scss"
import { SearchContext } from "../../App"
import { useDispatch } from "react-redux";
import { searchValue, setSearchValue } from "../../redux/slices/filterSlice";

export default function Search() {
    const dispatch = useDispatch();
    const [value, setValue] = useState("")
    // const { searchValue, setSearchValue } = useContext(SearchContext)
    // const  
    const inputRef = useRef();

    const onClickClear = () => {
        dispatch(setSearchValue(""));
        setValue("");
        inputRef.current.focus();
    }

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 150),
        [],
    );

    const onChangeInput = (str) => {
        setValue(str);
        updateSearchValue(str);
    }

    // useEffect(() => {
    //     console.log(document.querySelector("input"));
    // }, [])

    return (
        <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            <input
                ref={inputRef}
                value={value}
                onChange={e => onChangeInput(e.target.value)}
                className={styles.search}
                type="search"
                placeholder='Пошук...' />

            {/* {searchValue != "" ? (): null} */}
            {/* {searchValue != "" ? styles.searchCloseShow : null} */}

            <button
                type="button"
                onClick={e => onClickClear()}
                className={styles.searchClose + " " + (value !== "" ? styles.searchCloseShow : "")} >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_LG"> <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
            </button>
        </div>
    )
}