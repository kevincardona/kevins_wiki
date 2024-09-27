import Icons from '@/constants/icons';
import DesktopIcon from './';
import { useWindowContext, WINDOW_TYPES } from '@/contexts/WindowContext';

export default function ScuffleIcon() {
    const { createWindow } = useWindowContext();
    return (
        <DesktopIcon icon={Icons.SCUFFLE} name="Scuffle" onClick={() => {createWindow({type: WINDOW_TYPES.SCUFFLE, resizable: true})}} />
    );
}


