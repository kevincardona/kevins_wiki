import { WindowProvider } from "@/contexts/WindowContext";
import Desktop from "./Desktop";
import Dock from "./Dock";
import WindowManager from "./WindowManager";

export default function Home() {
    return (
        <WindowProvider>
            <div className="bg-c-light-blue w-screen h-screen flex flex-col">
                <div className="h-full w-full relative flex">
                    <Desktop />
                    <WindowManager />
                </div>
                <div className="relative w-full">
                    <Dock />
                </div>
            </div>
        </WindowProvider>
    )
}
