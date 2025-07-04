import React from 'react';
import { Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';

const ImgBtnModal = ({ src, fileName }) => {
  const { isOpen, open, close } = useModalState();

  return (
    <>
      <input
        type="image"
        src={src}
        alt=""
        onClick={close}
        className="mw-100 mh-100"
      />
      <Modal show={!isOpen} onHide={open}>
        <Modal.Header>
          <Modal.Title>{fileName.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img src={src} style={{ maxWidth: '50%', maxHeight: '50%' }} alt="img" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a href={src}>
            View File
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImgBtnModal;
