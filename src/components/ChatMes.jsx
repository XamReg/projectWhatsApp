import stylesMes from "../style/ChatMes.module.scss";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ChatMes = () => {
  const [allMess, setAllMess] = useState([]);
  const [numberCheck, setNumberCheck] = useState("");
  const numberForMes = useSelector((num) => num.messb.number);
  const idToken = useSelector((id) => id.messb.idToken);
  const messeg = useSelector((mess) => mess.messb.messb);
  useEffect(() => {
    if (Object.keys(messeg).length === 0) {
    } else {
      safeArray();
    }
  }, [messeg]);

  const safeArray = () => {
    setAllMess((prev) => [...prev, messeg]);
  };

  useEffect(() => {
    if (numberForMes.length != 0) {
        setAllMess(() => []);
        const a = setInterval(() => {
            var requestOptions = {
              method: "GET",
              redirect: "follow",
            };
            var requestOptionsDelete = {
              method: "DELETE",
            };
            fetch(
              `https://api.green-api.com/waInstance${idToken?.idApi}/receiveNotification/${idToken?.token}`,
              requestOptions
            )
                .then((response) => response.text())
                .then((result) => {
                    const resultToJSON = JSON.parse(result);
                    if(resultToJSON == null & resultToJSON == undefined) {return}
                    const receiptId = resultToJSON.receiptId;
                    if(numberForMes == resultToJSON?.body?.senderData?.chatId.split("@")[0]) {
                        setNumberCheck(() => (resultToJSON?.body?.senderData?.chatId).split("@")[0])
                        setAllMess((prev) => [...prev, {
                            id: resultToJSON?.body?.idMessage,
                            mess: resultToJSON?.body?.messageData?.textMessageData?.textMessage,
                            pos: "right",
                        }])
                        fetch(
                            `https://api.green-api.com/waInstance${idToken?.idApi}/DeleteNotification/${idToken?.token}/${receiptId}`,
                            requestOptionsDelete
                        )
                            .then((response) => response.text())
                            .then((result) => {
                            });
                    }
                    
                }) 
              .catch((error) => error);
          }, 10000);
        //   clearInterval(a);  
    }
  }, [numberForMes]);

  return (
    <div className={stylesMes.chatMes}>
      {allMess.map((solo, index) => (
        <div key={index} className={stylesMes.chatMes_mainBlock}>
          {solo.pos == "left" ? (
            <div className={stylesMes.chatMes_mainBlock_blockLeft}>
              <span className={stylesMes.chatMes_mainBlock_blockLeft_mess}>
                {solo?.mess}
              </span>
            </div>
          ) : (
            <div className={stylesMes.chatMes_mainBlock_blockRight}>
              <span className={stylesMes.chatMes_mainBlock_blockRight_mess}>
                {solo?.mess}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMes;
