import { WindowState } from "@/components/Window";
import Icons from "@/constants/icons";
import { useWindowContext, WINDOW_TYPES } from "@/contexts/WindowContext";

type ButtonType = {
    iconPath: string;
    children: string;
}

type DockButtonProps = {
    type: WINDOW_TYPES;
    focused?: boolean;
}

export default function DockButton({ type, focused = false }: DockButtonProps) {
    const { createWindow, updateWindowState } = useWindowContext();

    const createFocusOrMinimize = () => {
        if (focused) {
            updateWindowState(type.toString(), WindowState.MINIMIZED);
        } else {
            createWindow({ type, resizable: true });
        }
    }

    const WINDOW_TYPE_MAPPING: Record<WINDOW_TYPES, ButtonType> = {
        [WINDOW_TYPES.PROFILE]: {
            iconPath: Icons.PROFILE,
            children: "Profile"
        },
        [WINDOW_TYPES.FLAPPY_BIRD]: {
            iconPath: Icons.FLAPPY_BIRD,
            children: "Flap Bird"
        },
        [WINDOW_TYPES.RESUME]: {
            iconPath: Icons.RESUME,
            children: "Resume"
        },
        [WINDOW_TYPES.EMAIL]: {
            iconPath: Icons.EMAIL,
            children: "Email"
        },
        [WINDOW_TYPES.SCUFFLE]: {
            iconPath: Icons.SCUFFLE,
            children: "Scuffle"
        },
        [WINDOW_TYPES.PORTFOLIO]: {
            iconPath: Icons.PORTFOLIO,
            children: "Kevins.wiki"
        },
        [WINDOW_TYPES.CUSTOM]: {
            iconPath: "",
            children: "Custom"
        },
    };

    const { iconPath, children } = WINDOW_TYPE_MAPPING[type] || {
        iconPath: '/not-found',
        children: 'Unknown',
    };

    const onClick = () => createFocusOrMinimize();

    return (
        <div className={`flex justify-left shadow-inner bg-c-light-gray border border-c-darker-gray text-c-darkerr-gray font-sans font-bold py-1 px-2 w-32 overflow-hidden cursor-pointer shadow-inner shadow-md active:shadow-none select-none ${focused ? "shadow-[inset_1px_2px_5px_#777] border-2 bg-dock-icon-pressed-bg text-dock-icon-pressed-fg" : ""}`} onClick={onClick} >
            <img src={iconPath || '/not-found'} className="bg-opacity-20 mr-2 h-full w-auto" draggable="false" />
            <p className={`${focused ? "leading-[1.25rem]": "leading-[1.25rem]"} text-sm text-nowrap`}>{children}</p>
        </div >

    )
}

