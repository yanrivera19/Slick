import { useState } from "react";
import { useDispatch } from "react-redux";

const CreateWorkspaceAddDescription = ({ createNewWorkspace }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <div className="setup-page-step-head">
        <p>Step 3 of 3</p>
      </div>
      <h2 className="setup-main-head">
        What's your team working on right now?
      </h2>
      <p className="setup-info">
        This could be anything: a project, campaign, event, or the deal you're
        trying to close.
      </p>
      <div className="">
        <div>
          <input
            className="setup-input-field"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ex: Q4 budget, autumn campaign"
          />
        </div>
        {/* </section> */}

        <div className="setup-next-btn-cont">
          {/* <NavLink to={inputValue.trim().length < 1 ? ``}> */}
          <button
            disabled={inputValue.trim().length < 1}
            className={`setup-next-btn ${
              inputValue.trim().length > 0 ? "ready" : ""
            }`}
            onClick={() => createNewWorkspace(inputValue)}
          >
            Next
          </button>
          {/* </NavLink> */}
        </div>
        {/* <form onSubmit={onSubmit}>
              <input
                placeholder="Ex: Acme Marketing or Acme Co"
                className="setup-input-field"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="setup-next-btn-cont"> */}
        {/* <NavLink to={inputValue.trim().length < 1 ? ``}> */}
        {/* <button
                  disabled={inputValue.trim().length < 1}
                  className={`setup-next-btn ${
                    inputValue.trim().length > 0 ? "ready" : ""
                  }`}
                >
                  Next
                </button> */}
        {/* </NavLink> */}
        {/* </div> */}
        {/* </form> */}
      </div>
      {/* </section> */}
    </>
  );
};

export default CreateWorkspaceAddDescription;
