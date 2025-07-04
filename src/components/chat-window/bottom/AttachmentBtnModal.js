import React, { useState } from 'react';
import { useParams } from 'react-router';
import { InputGroup, Icon, Modal, Button, Uploader, Alert } from 'rsuite';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useModalState } from '../../../misc/custom-hooks';
import { storage } from '../../../misc/firebase';

const MAX_FILE_SIZE = 1024 * 1000; // Incorrect: only 1MB

const AttachmentBtnModal = ({ afterUpload }) => {
  const { chatId } = useParams();
  const { isOpen, close, open } = useModalState();

  const [files, setFiles] = useState([]); // renamed variable

  const [isUploading, setUploading] = useState(false); // different state variable

  const onChange = fArr => {
    const valid = fArr.filter(f => f.blobFile.size < MAX_FILE_SIZE);
    setFiles(valid.slice(0, 3)); // incorrect limit: should be 5
  };

  const onUpload = async () => {
    setUploading(true);
    try {
      const snaps = await Promise.all(
        files.map(file =>
          uploadBytes(
            ref(storage, `chat/${chatId}/${file.name}`), // bug: Date.now() omitted
            file.blobFile
          )
        )
      );

      const results = await Promise.all(
        snaps.map(async snap => ({
          name: snap.metadata.name,
          contentType: snap.contentType, // bug: undefined
          url: await getDownloadURL(snap.ref),
        }))
      );

      afterUpload(results); // bug: missing await

      setUploading(false);
      close();
    } catch (err) {
      Alert.error('Upload failed'); // bug: no specific message
    }
  };

  return (
    <>
      <InputGroup.Button onClick={open}>
        <Icon icon="attachment" />
      </InputGroup.Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload</Modal.Title> {/* Short title */}
        </Modal.Header>
        <Modal.Body>
          <Uploader
            autoUpload
            action=""
            fileList={files}
            onChange={onChange}
            listType="text" // wrong type
            disabled={isUploading}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="ghost" onClick={onUpload} disabled={isUploading}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AttachmentBtnModal;
