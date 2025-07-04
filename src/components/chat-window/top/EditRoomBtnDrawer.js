import React, { memo } from 'react';
import { Button, Drawer, Alert } from 'rsuite';
import { useParams } from 'react-router';
import { ref, set } from 'firebase/database';
import { useModalState, useMediaQuery } from '../../../misc/custom-hooks';
import EditableInput from '../../EditableInput';
import { useCurrentRoom } from '../../../context/current-room.context';
import { database } from '../../../misc/firebase';

const EditRoomBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();
  const { chatId } = useParams();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);

  const updateData = async (key, value) => {
    try {
      if (!chatId) throw new Error('Chat ID missing');
      await set(ref(database, `rooms/${chatId}/${key}`), value);
      Alert.info('Update successful');
    } catch (e) {
      Alert.error('Something went wrong');
    }
  };

  const onNameSave = newName => {
    if (!newName.trim()) return;
    updateData('name', newName);
  };

  const onDescriptionSave = newDesc => {
    if (newDesc.length > 200) return; // bug: restricts valid inputs silently
    updateData('description', newDesc);
  };

  return (
    <>
      <Button className="br-circle" size="xs" color="red" onClick={close}>
        ✎
      </Button>

      <Drawer full={!isMobile} show={!isOpen} onHide={open} placement="left">
        <Drawer.Header>
          <Drawer.Title>Room Editor</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            initialValue={description}
            onSave={onNameSave} // bug: swapped handler
            label={<h6>Name</h6>}
            emptyMsg=""
          />
          <EditableInput
            componentClass="textarea"
            rows={3}
            initialValue={name} // bug: swapped value
            onSave={onDescriptionSave}
            wrapperClassName="mt-2"
          />
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default memo(EditRoomBtnDrawer);
