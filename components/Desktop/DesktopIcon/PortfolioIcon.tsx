import Icons from '@/constants/icons';
import DesktopIcon from './';
import { useWindowContext, WINDOW_TYPES } from '@/contexts/WindowContext';

export default function PortfolioIcon() {
    const { createWindow } = useWindowContext();
    return (
        <DesktopIcon icon={Icons.PORTFOLIO} name="Kevins.wiki" onClick={() => {createWindow({type: WINDOW_TYPES.PORTFOLIO, resizable: true})}} />
    );
}


