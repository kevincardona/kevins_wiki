import Icons from '@/constants/icons';
import DesktopIcon from './';
import { useWindowContext, WINDOW_TYPES } from '@/contexts/WindowContext';

export default function ResumeIcon() {
    const { createWindow } = useWindowContext();
    return (
        <DesktopIcon icon={Icons.RESUME} name="Resume" onClick={() => {createWindow({type: WINDOW_TYPES.RESUME, resizable: true})}} />
    );
}

