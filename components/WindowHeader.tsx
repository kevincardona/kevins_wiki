import { useWindowContext } from "@/contexts/WindowContext";
import { useIsMobile } from "@/hooks/useIsMobile";

type HeaderProps = {
    exit: () => void;
    maximize: () => void;
    minimize: () => void;
    resizable?: boolean;
    focused?: boolean;
}

export default function Header({ exit, minimize, maximize, focused = false, resizable = true }: HeaderProps) {
    const { providerId } = useWindowContext();
    const isMobile = useIsMobile();
    return (
        <div className={`handle-${providerId} flex justify-end items-center ${focused ? "bg-c-dark-gray" : "bg-c-light-gray"} border-b border-gray-800 text-white p-1 handle ${isMobile ? "h-10" : "h-6"} select-none`}>
            <div className="flex items-center">
                <div className={`${focused ? "bg-c-darker-gray" : "bc-c-dark-gray"} ${isMobile ? "hidden" : ""} aspect-square h-4 mr-1 border border-gray-500 cursor-pointer`} onClick={minimize}>
                    <p className="leading-4 items-center justify-center flex text-xs">_</p>
                </div>
                {resizable &&
                    <div className={`${focused ? "bg-c-darker-gray" : "bc-c-dark-gray"} ${isMobile ? "hidden" : ""} aspect-square h-4 mr-1 border border-gray-500 cursor-pointer`} onClick={maximize}>
                        <p className='leading-4 items-center justify-center flex text-base'>□</p>
                    </div>
                }
                <div className={`${focused ? "bg-c-darker-gray" : "bc-c-dark-gray"} ${isMobile ? "w-7 h-7" : "w-4 h-4"} mr-1 border border-gray-500 cursor-pointer`} onClick={exit}>
                    <p className={`${isMobile ? "leading-7 text-lg": "leading-4"} justify-center flex text-xs`}>X</p>
                </div>
            </div>
        </div>
    );
}

