import Icons from '@/constants/icons';
import DesktopIcon from './';
import { useWindowContext, WINDOW_TYPES } from '@/contexts/WindowContext';

export default function ProfileIcon() {
    const { createWindow } = useWindowContext();
    return (
        <DesktopIcon icon={Icons.PROFILE} name="Profile" onClick={() => {createWindow({type: WINDOW_TYPES.PROFILE, resizable: true})}} />
    );
}

