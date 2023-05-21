import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addNumber } from "../store/messSlice";
import styles from "../style/Chat.module.scss";

const Nav = () => {
    const dispatch = useDispatch();
    const[number, setNumber] = useState("");
    const[status,setStatus] = useState(true)

    const addNumberF = (e) => {
        setNumber(e.target.value)
        if (number.length == 10) {
            setStatus(() => false);
        }
    }

    return(
        <div className={styles.wrapper_container_chatBlock_nav}>
            <textarea
                className={styles.wrapper_container_chatBlock_nav_input}
                placeholder="Пример:7700..."
                onChange={addNumberF}
                maxLength={11}
                />
            <button
                disabled={status}
                onClick={() => {
                    dispatch(addNumber(number))
                    setStatus(() => true)
                }}
                >использовать</button>
        </div>
    )
}

export default Nav;