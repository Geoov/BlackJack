import React from "react";
import { useSelector } from "react-redux";
import "./UserCard.scss";

const UserCard = ({ id, index, name, isReady, updateIsReady }) => {
  const reduxUserId = useSelector((state) => state.user.userId);

  const changeReadyState = (event) => {
    updateIsReady(index, isReady);
  };

  return (
    <div className="user-card">
      <div className="name-wrapper mb-0">
        <p>{name}</p>
      </div>
      <div className="d-flex flex-row">
        {id === reduxUserId ? (
          <div className="current-user">
            <p>{isReady ? "I'm ready" : "I'm not ready"}</p>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="_checkbox"
                onChange={changeReadyState}
              ></input>
              <label htmlFor="_checkbox">
                <div id="tick_mark"></div>
              </label>
            </div>
          </div>
        ) : (
          <div className="another-user">{isReady ? "Ready" : "Stand-By"}</div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
