import React, { useEffect, useState } from 'react';
import SidebarChannel from './SidebarChannel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CallIcon from '@mui/icons-material/Call';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar } from '@mui/material';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';

import './Sidebar.css';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'channels'), (snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({ id: doc.id, channel: doc.data() }))
      );
    });
    return unsubscribe;
  }, []);

  const logout = async (e) => {
    await signOut(auth);
  };
  const handleAddChannel = async () => {
    let channelName = prompt('Enter a new channel name');
    channelName = channelName.replaceAll(' ', '');
    if (channelName) {
      const docRef = doc(db, 'channels', `${channelName}${Date.now()}`);
      const payload = {
        channelName: channelName,
      };
      await setDoc(docRef, payload);
    }
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <h3>Debangi</h3>
        <ExpandMoreIcon />
      </div>

      <div className='sidebar__channels'>
        <div className='sidebar__channelsHeader'>
          <div className='sidebar__header'>
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>

          <AddIcon className='sidebar__addChannel' onClick={handleAddChannel} />
        </div>
        <div className='sidebar__channelsList'>
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className='sidebar__voice'>
        <SignalCellularAltIcon
          className='sidebar__voiceIcon'
          fontSize='large'
        />
        <div className='sidebar__voiceInfo'>
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className='sidebar__voiceIcons'>
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className='sidebar__profile'>
        <Avatar onClick={logout} src={user.photo} alt={user.displayName} />
        <div className='sidebar__profileInfo'>
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 7)}</p>
        </div>
        <div className='sidebar__profileIcons'>
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
