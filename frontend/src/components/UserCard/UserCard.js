import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./UserCard.scss";
import ToggleReadySound from "../../../src/assets/audio/toggleReady.wav";

const UserCard = ({ id, index, name, isReady, updateIsReady }) => {
  const reduxUserId = useSelector((state) => state.user.userId);
  const [toggleReadyAudio] = useState(new Audio(ToggleReadySound));

  const changeReadyState = (event) => {
    updateIsReady(index, isReady);
    toggleReadyAudio.play();
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
