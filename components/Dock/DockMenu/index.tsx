import { useState, useEffect } from "react";

export default function DockMenu() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    return (
        <div className="ml-auto flex justify-center items-center w-full h-full text-c-darkerr-gray text-nowrap">
            <div className="ml-3">
                {formattedTime}
            </div>
        </div>
    );
}

