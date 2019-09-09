import React from "react";

function NoMatch() {
  return (
    <div className="outer-wrapper">
      <div className="outer-inner-wrapper">
        <div className="inner-wrapper">
          <div className="content">
            <h1>Sorry brewski! I think you're a touch off the beaten path.<br />Go on back the way ya came now!</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoMatch;