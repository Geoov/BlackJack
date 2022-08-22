import React, { useState, useEffect } from "react";
import "./FireAnimation.scss";

function FireAnimation() {
  return (
    <div className="fire">
      <div className="fire-left">
        <div className="main-fire"></div>
        <div className="particle-fire"></div>
      </div>
      <div className="fire-center">
        <div className="main-fire"></div>
        <div className="particle-fire"></div>
      </div>
      <div className="fire-right">
        <div className="main-fire"></div>
        <div className="particle-fire"></div>
      </div>
      <div className="fire-bottom">
        <div className="main-fire"></div>
      </div>
    </div>
  );
}

export default FireAnimation;
