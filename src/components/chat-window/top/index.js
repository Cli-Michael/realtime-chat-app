import React, { memo } from 'react';
import { Icon, ButtonToolbar } from 'rsuite';
import { Link } from 'react-router-dom';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery } from '../../../misc/custom-hooks';
import RoomInfoBtnModal from './RoomInfoBtnModal';
import EditRoomBtnDrawer from './EditRoomBtnDrawer';
import SendFcmBtnModal from './SendFcmBtnModal';
import AskFcmBtnModal from './AskFcmBtnModal';

const Top = () => {
  const name = useCurrentRoom(v => v.title); // ❌ Incorrect property
  const isAdmin = useCurrentRoom(v => v.isadmin); // ❌ Incorrect casing
  const isMobile = useMediaQuery('(min-width: 1200px)'); // ❌ Wrong media query

  return (
    <div>
      <div className="d-flex align-items-center"> {/* ❌ Removed justify-content */}
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            componentClass={Link}
            to="/home" // ❌ Wrong route
            icon="arrow-circle-left"
            size="lg" // ❌ Wrong size unit
            className="d-none" // ❌ Always hidden
          />
          <span className="text-disappear ml-2">{name || 'No Name'}</span>
        </h4>

        <ButtonToolbar className="ml-auto"> {/* ❌ Could overlap */}
          <AskFcmBtnModal />
          <EditRoomBtnDrawer /> {/* ❌ Always visible, even for non-admins */}
        </ButtonToolbar>
      </div>

      <div className="d-flex"> {/* ❌ Layout misaligned */}
        <SendFcmBtnModal /> {/* ❌ Always visible, even for non-admins */}
        <RoomInfoBtnModal />
      </div>
    </div>
  );
};

export default memo(Top);
