import { useEffect, useState } from "react";
import styles from "../style/Chat.module.scss";
import { useDispatch,useSelector } from "react-redux";
import {addMess} from "../store/messSlice";


const ChatField = () => {
    const dispatch = useDispatch();
    const [mess, setMess] = useState('');
    const [status, setStatus] = useState(false);
    const[idMess,setIdMess] = useState('');
    const handleMessageChange = (e) => {
        setMess(e.target.value);
    };
    const idToken = useSelector((id) => id.messb.idToken);
    const numberForMes = useSelector((num) => num.messb.number);
    
    useEffect(() => {
        if (idMess === undefined & idMess === "" ) return
        if (mess === "") return
        dispatch(addMess(
                {
                    id:idMess,
                    mess:mess,
                    pos: "left",
                }
            ))
    },[idMess])

    const sendMess = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
        "chatId": `${numberForMes}@c.us`,
        "message": mess
        });
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    fetch(`https://api.green-api.com/waInstance${idToken?.idApi}/sendMessage/${idToken?.token}`, requestOptions)
        .then(response => {
            response.json().then((data) => {
                if (response?.status == 466) {
                    setStatus(true)
                    return
                }
                setIdMess(() =>data?.idMessage)
                setStatus(false)
            })
        })
        .catch(error => {
            setStatus(true)
        });
    
        
    }

    return(
        <div className={styles.wrapper_container_chatBlock_chatField}>
            {
                status == true ?
                    <div className={styles.wrapper_container_chatBlock_chatField_blockError}>
                        <span className={styles.wrapper_container_chatBlock_chatField_blockError_error}>
                            Ошибка с номером, проверьте введённые данные!
                        </span>
                    </div>
                    :
                    <></>
            }
            <div className={styles.wrapper_container_chatBlock_chatField_blockInput}>
                <textarea 
                            type="text"
                            name="message"
                            value={mess}
                            onChange={handleMessageChange}
                            className={styles.wrapper_container_chatBlock_chatField_blockInput_input}/>
            </div>
            <div className={styles.wrapper_container_chatBlock_chatField_blockButton}>
                <button 
                    disabled={!mess && !numberForMes}
                    className={styles.wrapper_container_chatBlock_chatField_blockButton_buttonC} 
                    onClick={() => sendMess()}>
                        <p 
                            className={
                                (!mess) ? 
                                    styles.wrapper_container_chatBlock_chatField_blockButton_buttonC_backActiv
                                    :
                                    styles.wrapper_container_chatBlock_chatField_blockButton_buttonC_triangle
                            }
                        />
                </button>
            </div>
        </div>
    )
}

export default ChatField;