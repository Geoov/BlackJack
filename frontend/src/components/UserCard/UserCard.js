import React from "react";
import { useSelector } from "react-redux";
import "./UserCard.scss";

const UserCard = ({ id, index, name, isReady, updateIsReady }) => {
  const reduxUserId = useSelector((state) => state.user.userId);

  const changeReadyState = () => {
    updateIsReady(index, isReady);
  };

  return (
    <div className="user-card">
      <p>{reduxUserId}</p>
      <p className="name mb-0">{name}</p>
      {id === reduxUserId ? (
        <span>
          <input
            type="checkbox"
            id="ready-checkbox"
            onChange={changeReadyState}
          ></input>
          <p>{isReady ? "I'm ready" : "I'm not ready"}</p>
        </span>
      ) : (
        <span>{isReady ? "ready" : "stand-by"}</span>
      )}
    </div>
  );
};

export default UserCard;
