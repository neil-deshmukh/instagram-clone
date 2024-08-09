import { GiCancel } from "react-icons/gi";
import "./Modal.css"

export default function Modal({setIsModal}) {
  return (
    <div className="darkBg" onClick={() => setIsModal(false)}>
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Confirm?</h5>
          </div>
          <div
            className="closeBtn cursor-pointer"
            onClick={() => setIsModal(false)}
          >
            <GiCancel />
          </div>
          <div className="modalContent">
            <h3>Are you sure you want to log out?</h3>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="logOutBtn" onClick={() => {
                setIsModal(false)
                localStorage.clear()
                window.location.replace("/")
              }}>Log Out</button>
              <button className="cancelBtn" onClick={() => setIsModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
