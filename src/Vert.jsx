import { useState, useEffect } from "react"; 
import styles from "./style/Chat.module.scss";
import stylesVert from "./style/Vert.module.scss"
import { useDispatch } from "react-redux";
import {addTokenId} from "./store/messSlice";
import App from "./App";
import { useNavigate } from 'react-router-dom'





const Vert = () => {
    const[idApi,setIdApi] = useState("");
    const[token,setToken] = useState('');
    const[status,setStatus] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const idAp = (e) => {
        setIdApi(e.target.value)
    }
    const tokenAp = (e)=> {
        setToken(e.target.value)
    }
    

    const checkApi = () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`https://api.green-api.com/waInstance${idApi}/getSettings/${token}`, requestOptions)
            .then(response => {
                if (response?.status != 200) {
                    setStatus(() => false)
                    return
                }
                dispatch(addTokenId({
                    idApi,
                    token,
                }))
                setStatus(() => true)
                (navigate("/whats-app"))
            })
            .catch(
                (error) => {
                    setStatus(() => false)
                    
                }
            );
    }
    useEffect(() => {
        if (status === true) return 
        const timeout = setTimeout(() => {
        setStatus(() => true)
        }, 10000);
    
        return () => clearTimeout(timeout);
    }, [status]);

    return(
        <div className={styles.wrapper}>
            <div className={styles.wrapper_container}>
                <div className={stylesVert.vertBlock}> 
                    <div  className={stylesVert.vertBlock_blockInput}>
                        <textarea 
                            onChange={idAp}
                            // value={idApi}
                            placeholder="idInstance"
                            className={stylesVert.vertBlock_blockInput_input}
                            />
                        <textarea 
                            onChange={tokenAp}
                            // value={token}
                            placeholder="apiTokenInstance"
                            className={stylesVert.vertBlock_blockInput_input}
                            />
                        <button
                            onClick={() => checkApi()}
                            disabled={!idApi || !token}
                            className={stylesVert.vertBlock_blockInput_buttonToken}
                            >Проверить</button>
                    </div>
                    {
                        status == false ?
                            <div className={stylesVert.vertBlock_blockError}>
                                <span> 
                                    Ошибка в idInstance или apiTokenInstance проверьте данные и повторите еще раз
                                </span>
                            </div>
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
};

export default Vert;