import { useWindowContext } from "@/contexts/WindowContext";
import DockButton from "./DockButton";
import DockMenu from "./DockMenu";

export default function Dock() {
    const { windows, focusedWindow } = useWindowContext();
    return (
        <>
            <div className="flex flex-row z-max p-0.75 h-10 fixed bottom-0 left-0 w-full border-black border-t bg-c-dark-gray">
                {windows.map((window) => (
                    <DockButton key={window.type} type={window.type} focused={window.id == focusedWindow} />
                ))}
                <div className="ml-auto mr-3">
                    <DockMenu />
                </div>
            </div>
        </>
    );
}

