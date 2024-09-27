import Icons from '@/constants/icons';
import DesktopIcon from './';
import { useWindowContext, WINDOW_TYPES } from '@/contexts/WindowContext';

export default function FlappyBirdIcon() {
    const { createWindow } = useWindowContext();
    return (
        <DesktopIcon icon={Icons.FLAPPY_BIRD} name="Flap Bird" onClick={() => {createWindow({type: WINDOW_TYPES.FLAPPY_BIRD, resizable: true})}} />
    );
}

