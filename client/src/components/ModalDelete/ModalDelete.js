import { useState } from "react";
import FadeIn from "react-fade-in";
import "./ModalDelete.scss";

function ModalDelete({setShowDeleteModal, requestDelete, itemName})
{
  const [inContainer, setInContainer] = useState(true);

  const handleClick = () => {
    if (inContainer) return;
    setShowDeleteModal(false);
  }

  return (
    <div className="ModalDelete" onClick={handleClick}>
      <FadeIn>
        <div 
          className="ModalDelete__container" 
          onMouseEnter={() => setInContainer(true)}
          onMouseLeave={() => setInContainer(false)}
        >
          <h3 className="ModalDelete__heading">{`Are you sure you want to delete ${itemName}?`}</h3>
          <p className="ModalDelete__paragraph">This action cannot be undone.</p> 
          <div>
            <button className="ModalDelete__button--cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            <button className="ModalDelete__button--delete" onClick={requestDelete}>Delete</button>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

export default ModalDelete;