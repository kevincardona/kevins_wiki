import EmailIcon from "./DesktopIcon/EmailIcon";
import FlappyBirdIcon from "./DesktopIcon/FlappyBirdIcon";
import PortfolioIcon from "./DesktopIcon/PortfolioIcon";
import ProfileIcon from "./DesktopIcon/ProfileIcon";
import ResumeIcon from "./DesktopIcon/ResumeIcon";
import ScuffleIcon from "./DesktopIcon/ScuffleIcon";

export default function Desktop() {
    return (
        <div className="w-full h-full">
            <ProfileIcon />
            <FlappyBirdIcon />
            <PortfolioIcon />
            <EmailIcon />
            <ScuffleIcon />
            <ResumeIcon />
        </div>
    );
}

