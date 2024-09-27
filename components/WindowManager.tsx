import { useWindowContext, WindowContent } from "@/contexts/WindowContext";
import Window from "@/components/Window";

export default function WindowManager() {
    const { windows, focusedWindow } = useWindowContext();

    console.log("windows", windows);
    return (
        <>
            {windows.map((window: WindowContent) => (
                <Window
                    id={window.id}
                    key={window.id}
                    windowState={window.state}
                    focused={window.id === focusedWindow}
                    zIndex={window.zIndex}
                    resizable={window.resizable}
                >
                    {window.children}
                </Window>
            ))}
        </>
    );
}

