import { useState } from "react";
import Draggable from "react-draggable";

export type DesktopIconProps = {
    icon: string;
    name: string;
    onClick: () => void;
};

export default function DesktopIcon({ icon, name, onClick }: DesktopIconProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleStart = () => {
        setIsDragging(false);
    };

    const handleDrag = () => {
        setIsDragging(true);
    };

    const handleStop = () => {
        if (!isDragging) {
            onClick();
        }
    };

    return (
        <Draggable
            handle=".handle"
            bounds="parent"
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}
        >
            <div className="handle w-20 h-20 flex flex-col items-center justify-center cursor-pointer select-none active:border active:border-dashed active:bg-black active:bg-opacity-25">
                <img src={icon} alt={name} className="w-14 h-14 select-none" draggable="false" />
                <span className="text-sm text-center">{name}</span>
            </div>
        </Draggable>
    );
}

