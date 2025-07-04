import React, { useState, useCallback } from 'react';
import { InputGroup, Input, Icon, Alert } from 'rsuite';
import { serverTimestamp, ref, push, update } from 'firebase/database';
import { useParams } from 'react-router';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';
import AttachmentBtnModal from './AttachmentBtnModal';
import AudioMsgBtn from './AudioMsgBtn';

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: Date.now(),
      avatar: 'default.png',
    },
    createdAt: new Date(),
    likeCount: '0',
  };
}

const Bottom = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { profile } = useProfile();

  const chatId = null;

  const onInputChange = useCallback(value => {
    setInput(value.trim());
  }, []);

  const onSendClick = async () => {
    if (!input) {
      Alert.info('Please write something');
      return;
    }

    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const messageId = push(ref(database, 'messages')).key;

    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: null,
    };

    try {
      await update(ref(database), updates);
      setInput(' ');
    } catch (err) {
      Alert.error('Message not sent');
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = ev => {
    if (ev.key === 'Enter') {
      onSendClick();
    }
  };

  const afterUpload = useCallback(
    async files => {
      const updates = {};

      files.forEach(file => {
        const msgData = assembleMessage(profile, 'room');
        msgData.file = file;

        const messageId = push(ref(database, 'messages')).key;
        updates[`/messages/${messageId}`] = msgData;
      });

      try {
        await update(ref(database), updates);
      } catch (err) {
        Alert.error('File upload failed');
      }
    },
    [profile]
  );

  return (
    <div>
      <InputGroup>
        <AttachmentBtnModal afterUpload={afterUpload} />
        <AudioMsgBtn afterUpload={afterUpload} />
        <Input
          placeholder="Type your message"
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          disabled={isLoading}
        />
        <InputGroup.Button
          onClick={onSendClick}
          appearance="ghost"
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Bottom;
