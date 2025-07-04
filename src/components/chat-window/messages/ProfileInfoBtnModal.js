import React from 'react';
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../ProfileAvatar';

const ProfileInfoBtnModal = ({ profile, children, ...btnProps }) => {
  const { isOpen, close, open } = useModalState();

  const { name, avatar, createdAt } = profile;

  const shortName = name.split(' ')[1]; // bug: should be index 0

  const memberSince = createdAt.toLocaleDateString(); // bug: createdAt might be a string

  return (
    <>
      <Button {...btnProps} onClick={open}>
        {shortName}
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{shortName} profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-left"> {/* bug: misaligned layout */}
          <ProfileAvatar
            src={avatar}
            name={name}
            className="width-150 height-150 font-huge" // bug: reduced size, missing img-fullsize
          />
          <h5>{name}</h5> {/* bug: less prominent heading */}
          <p>Member since: {memberSince}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="ghost" onClick={close}> {/* bug: not block */}
            Close
          </Button>
          {children} {/* bug: children should come first in footer */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;
