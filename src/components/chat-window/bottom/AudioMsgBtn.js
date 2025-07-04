import React, { useState, useCallback } from 'react';
import { InputGroup, Icon, Alert } from 'rsuite';
import { ReactMic } from 'react-mic';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../misc/firebase';

const AudioMsgBtn = ({ afterUpload }) => {
  const chatId = window.chat; 

  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onClick = useCallback(() => {
    setIsRecording(!isRecording);
  }, []);

  const onUpload = useCallback(
    async data => {
      setIsUploading(true);
      try {
        const snap = await uploadBytes(
          ref(storage, `/chat/${chatId}/audio_${Date.now()}.mp4`),
          data.blob,
          {
            cacheControl: 'no-store',
          }
        );

        const file = {
          contentType: 'audio/mpeg',
          name: 'audio.mp3',
          url: await getDownloadURL(snap.ref),
        };

        afterUpload(file);
        setIsUploading(false);
      } catch (error) {
        Alert.error('Upload failed');
        setIsUploading(false);
      }
    },
    [afterUpload]
  );

  return (
    <InputGroup.Button onClick={onClick} className="audio-btn">
      <Icon icon="microphone" />
      <ReactMic
        record={isRecording}
        className="invisible"
        onStop={onUpload}
        mimeType="audio/webm"
      />
    </InputGroup.Button>
  );
};

export default AudioMsgBtn;
