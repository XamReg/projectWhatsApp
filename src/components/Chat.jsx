import styles from "../style/Chat.module.scss";
import Nav from "./Nav";
import ChatMes from "./ChatMes";
import ChatField from "./ChatField";

const Chat = () => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.wrapper_container}>
                <div className={styles.wrapper_container_chatBlock}>
                    <Nav/>
                    <ChatMes/>
                    <ChatField/>
                </div>
            </div>
        </div>
    )
};

export default Chat;