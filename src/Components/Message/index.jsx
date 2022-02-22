import style from "./Message.module.scss";
import ShowTime from "../ShowTime";
import { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  collection,
  getFirestore,
  where,
} from "firebase/firestore";
import ProfileCard from "../ProfileCard";

import app from "../../libs/firebase.config";
import { useSelector } from "react-redux";
import { patchGroups } from "../../libs/firebaseFunctions";

const db = getFirestore(app);

function toDateTime(secs) {
  const t = new Date(1970, 0, 1); // Epoch
  t.setTime(secs * 1000);
  return t;
}

export const Message = (props) => {
  const message = props.data;
  const date = message.date || { seconds: 1644405843 };
  const [updateMessage, setUpdateMessage] = useState({ message: message, status: false })

  const [user, setUser] = useState({
    name: "",
    lastname: "",
    photo: message.photo,
    id: "",
    email: "",
  });
  const [lilModalDisplay, setLilModalDisplay] = useState(false);
  const currentUser = useSelector((state) => state.user);
  
  useEffect(() => {
    const qu = query(
      collection(db, "users"),
      where("id", "==", message.author)
      );
      onSnapshot(qu, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      });
    }, [message]);


  

  const [showProfile, setShowProfile] = useState(false);
  function handleDeleteMessage() {
    let updatedMessages = props.messages.filter(
      (x) => x.message_id !== message.message_id
    );
    patchGroups("messages", message.message_group, updatedMessages);
  }
  function handleUpdateMessage(e) {
    e.preventDefault();
    let updatedMessages = props.messages.map((x) => {
      if (x.message_id === message.message_id) { return updateMessage.message }
      return x
    });

    patchGroups("messages", message.message_group, updatedMessages);
    setUpdateMessage({ ...updateMessage, status: !updateMessage.status });
  }

  return (
    <>
      {showProfile && (
        <ProfileCard show={showProfile} setShow={setShowProfile} user={user} />
      )}
      <li
        
        onMouseLeave={() => setLilModalDisplay(false)}
        onMouseOver={() => setLilModalDisplay(true)}
        className={style.message}
        
      >


        <form className={style.updateMessageForm} onSubmit={(e) => handleUpdateMessage(e)}>
        <label className={style.label} htmlFor={message.message_id}>Modifica qui</label>
          <input
            value={updateMessage.message.text}
            onChange={(e) => setUpdateMessage({ ...updateMessage, message: { ...message, text: e.target.value } })}
            className={`${updateMessage.status ? style.updateMessage : style.hiddenUpdateMessage}`}
            type="text" id={message.message_id}
          />

        </form>
        <div className={style.author}>
          <img
            src={user.photo}
            alt={user.name}
            onClick={() => setShowProfile(!showProfile)}
          />
          <div className={style.nameText}>
            <div className={style.authorDate}>
              <h3>{user.name + " " + user.lastname}</h3>
              <ShowTime date={toDateTime(date.seconds)} />
            </div>
            {updateMessage.status === false && <p>{message.text}</p>}
          </div>
          {lilModalDisplay && message.author === currentUser.id && (
            <div className={style.lilModal}>
              <button onClick={() => handleDeleteMessage()}>❌</button>
              <button onClick={() => setUpdateMessage({ ...updateMessage, status: !updateMessage.status })}>✍️</button>
            </div>
          )}
        </div>
      </li>
    </>
  );
};
