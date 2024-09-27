import Icons from '@/constants/icons';
import DesktopIcon from './';
import { useWindowContext, WINDOW_TYPES } from '@/contexts/WindowContext';

export default function EmailIcon() {
    const { createWindow } = useWindowContext();
    return (
        <DesktopIcon icon={Icons.EMAIL} name="Email" onClick={() => {createWindow({type: WINDOW_TYPES.EMAIL, resizable: true})}} />
    );
}

