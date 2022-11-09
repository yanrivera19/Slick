import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import getTimeOfMessage from "../../../../util";
import { updateMessage, deleteMessage } from "../../../../store/messages";
import ThreeDotsVert from "../../../Svgs&Icons/ThreeDotsVert";
import { BsTrash } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import CrossIcon from "../../../Svgs&Icons/CrossIcon";

const Message = ({ message, position }) => {
  const [editMode, setEditMode] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const [messageContent, setMessageContent] = useState("");
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [moreActionsClicked, setMoreActionsClicked] = useState(false);
  const editTextRef = useRef(null);
  const [messageContainer, setMessageContainer] = useState(null);
  const [actionsBox, setActionsBox] = useState(null);
  const [moreActionsBox, setMoreActionsBox] = useState(null);
  const [deleteAlertModal, setDeleteAlertModal] = useState(false);
  // const menuPop = usePopper(messageContainer, actionsBox, {
  //   placement: "top",
  //   modifiers: [
  //     {
  //       name: "flip",
  //     },
  //     {
  //       name: "offset",
  //       options: {
  //         offset: [-10, 50],
  //       },
  //     },
  //   ],
  // });

  // const fullMenuPop = usePopper(actionsBox, moreActionsBox, {
  //   placement: "left",
  //   modifiers: [
  //     {
  //       name: "flip",
  //     },
  //     {
  //       name: "offset",
  //       options: {
  //         offset: [30, -50],
  //       },
  //     },
  //   ],
  // });

  const handleEdit = (e, msg) => {
    e.preventDefault();
    // setLastMessage(messageContent);
    dispatch(
      updateMessage({
        ...msg,
        content: messageContent,
      })
    );
    setMessageContent("");
    // setEditOrDeleteMsg(true);
    setEditMode(!editMode);
  };

  const handleTrashClick = () => {
    // debugger;
    setDeleteAlertModal(!deleteAlertModal);
  };
  // console.log(deleteAlertModal);

  const handleDelete = (e, msgId) => {
    dispatch(deleteMessage(msgId));
    // setEditOrDeleteMsg(true);
  };

  const handleMouseOver = () => {
    setIsHovered(true);

    // createPopper(messageContainer, actionsBox, {
    //   placement: "top",
    //   modifiers: [
    //     {
    //       name: "flip",
    //     },
    //     {
    //       name: "offset",
    //       options: {
    //         offset: [-10, 50],
    //       },
    //     },
    //   ],
    // });
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const showMoreActionsPopUp = () => {
    setMoreActionsClicked(!moreActionsClicked);

    // createPopper(actionsBox, moreActionsBox, {
    //   placement: "left",
    //   modifiers: [
    //     {
    //       name: "flip",
    //     },
    //     {
    //       name: "offset",
    //       options: {
    //         offset: [30, -50],
    //       },
    //     },
    //   ],
    // });
  };

  useEffect(() => {
    if (editMode === true) {
      editTextRef.current.scrollIntoView();
    }
  }, [editMode]);

  return !editMode ? (
    <>
      {/* <div className="big-overlayed-div">
        <div id="more-actions-menu">
          <p>hello</p>
        </div>
      </div> */}
      <section className={deleteAlertModal ? "delete-modal-container" : "hide"}>
        <div id="delete-modal">
          <div className="delete-modal-header">
            <h1 id="delete-header">Delete Message</h1>
            <button onClick={handleTrashClick} className="cross-btn">
              <CrossIcon size={22} />
            </button>
          </div>
          <div id="delete-modal-info-cont">
            <p>
              Are you sure you want to delete this message? This cannot be
              undone.
            </p>
            <div className="message-container-modal">
              <div
                style={{
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                {/* font-family: Slack-Lato,Slack-Fractions,appleLogo,sans-serif; */}
                <strong>
                  {message.author
                    ? message.author.username
                    : message.authorName}
                </strong>
                <span id="time-of-msg">
                  {getTimeOfMessage(message.createdAt)}
                </span>
              </div>
              <p>{message.content}</p>
            </div>
          </div>
          <div className="cancel-delete-btn-container">
            <button id="cancel-delete-btn" onClick={handleTrashClick}>
              Cancel
            </button>
            <button
              id="delete-btn"
              onClick={(e) => handleDelete(e, message.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </section>
      <div
        className="message-cont"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        // ={messageContainer}
        ref={messageContainer}
      >
        {/* <Portal> */}

        {/* <div
          style={{
            display: `${sessionUser.id === message.authorId ? "flex" : "none"}`,
          }}
        >
          <button
            style={{ margin: "0 10px" }}
            onClick={(e) => handleDelete(e, message.id)}
          >
            DELETE
          </button>
          <button
            onClick={(e) => {
              setMessageContent(message.content);
              setEditMode(!editMode);
            }}
          >
            EDIT
          </button>
        </div> */}

        <div
          className={
            isHovered && sessionUser.id === message.authorId
              ? "edit-delete-box"
              : "hide"
          }
          // ={actionsBox}
          ref={actionsBox}
          style={position === 0 ? { top: "10px" } : { top: "-15px" }}
          // {...menuPop.attributes.popper}
        >
          {/* onClick={showMoreActionsPopUp} */}
          <button
            className="pop-menu-btns"
            onClick={(e) => {
              setMessageContent(message.content);
              setEditMode(!editMode);
            }}
          >
            <CiEdit size={20} />
          </button>
          <button className="pop-menu-btns" onClick={handleTrashClick}>
            <BsTrash />
          </button>
        </div>
        {/* </Portal>
        <Portal> */}
        <div
          className={moreActionsClicked ? "big-overlayed-div" : "hide"}
          // ={moreActionsBox}
          ref={moreActionsBox}
          // style={fullMenuPop.styles.popper}
          // {...fullMenuPop.attributes.popper}
        >
          <div id="more-actions-menu">
            <p>hello</p>
          </div>
        </div>
        {/* </Portal> */}
        <div style={{ padding: "8px 20px" }}>
          <div
            style={{
              marginBottom: "5px",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <strong>
              {message.author ? message.author.username : message.authorName}
            </strong>
            <span id="time-of-msg">{getTimeOfMessage(message.createdAt)}</span>
          </div>
          <p>{message.content}</p>
        </div>
      </div>
    </>
  ) : (
    <div id="edit-textarea" ref={editTextRef}>
      <div className="chat-cont">
        <div className="top-chat"></div>
        <div className="textarea-container">
          <form onSubmit={(e) => handleEdit(e, message)}>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows="1"
            />
            <div className="bottom-chat edit">
              <div className="msg-edit-btns">
                <button
                  id="cancel-edit-btn"
                  onClick={(e) => setEditMode(!editMode)}
                >
                  Cancel
                </button>
                <button id="save-edit-btn">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;
