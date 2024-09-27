import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { WindowState } from "@/components/Window";
import Profile from "@/components/websites/Profile";
import Scuffle from "@/components/websites/Scuffle";
import FlappyBird from "@/components/websites/FlappyBird";
import Resume from "@/components/websites/Resume";
import Email from "@/components/websites/Email";
import Portfolio from "@/components/websites/Portfolio";
import { useIsMobile } from "@/hooks/useIsMobile";

export enum WINDOW_TYPES {
    PROFILE,
    RESUME,
    EMAIL,
    FLAPPY_BIRD,
    SCUFFLE,
    PORTFOLIO,
    CUSTOM,
}

const windowComponents: { [key in WINDOW_TYPES]: ReactNode } = {
    [WINDOW_TYPES.PROFILE]: <Profile />,
    [WINDOW_TYPES.RESUME]: <Resume />,
    [WINDOW_TYPES.EMAIL]: <Email />,
    [WINDOW_TYPES.FLAPPY_BIRD]: <FlappyBird />,
    [WINDOW_TYPES.SCUFFLE]: <Scuffle />,
    [WINDOW_TYPES.PORTFOLIO]: <Portfolio />,
    [WINDOW_TYPES.CUSTOM]: <div>This should be overwritten when creating the window</div>,
};


export type WindowContent = {
    id: string;
    type: WINDOW_TYPES;
    children?: React.ReactNode;
    state: WindowState;
    zIndex?: number;
    resizable?: boolean;
};

type CreateWindowParams = {
    id?: string;
    type?: WINDOW_TYPES;
    custom_children?: ReactNode;
    resizable?: boolean;
};

type WindowContextType = {
    windows: WindowContent[];
    createWindow: (props: CreateWindowParams) => void;
    closeWindow: (id: string) => void;
    updateWindowState: (id: string, state: WindowState) => void;
    focusWindow: (id: string) => void;
    focusedWindow: string | null;
    providerId: string | null;
};

/** Default windows that will be opened when the app starts */
const createDefaultWindows = () => {
    return [
        {
            id: WINDOW_TYPES.PROFILE.toString(),
            type: WINDOW_TYPES.PROFILE,
            children: windowComponents[WINDOW_TYPES.PROFILE],
            state: WindowState.NORMAL,
            zIndex: 1,
            resizable: true,
        },
    ];
};

const createRandomId = () => Math.random().toString(36).substring(7);

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider = ({ children }: { children: ReactNode }) => {
    const [providerId, setProviderId] = useState<string | null>(null);
    const [windows, setWindows] = useState<WindowContent[]>([...createDefaultWindows()]);
    const [focusedWindow, setFocusedWindow] = useState<string | null>(WINDOW_TYPES.PROFILE.toString());
    const [zIndexCounter, setZIndexCounter] = useState<number>(1);

    const isMobile = useIsMobile();

    useEffect(() => {
        const initializeProviderId = async () => {
            const generatedId = createRandomId();
            setProviderId(generatedId);
        };

        initializeProviderId();
    }, []);

    useEffect(() => {
        if (isMobile) {
            setWindows((prevWindows) =>
                prevWindows.map((w) => ({ ...w, state: WindowState.MAXIMIZED, resizable: false }))
            );
        }
    }, [isMobile]);

    const getWindowByType = (type: WINDOW_TYPES) => {
        return windows.find((w) => w.type === type);
    }

    /* id should be included when WINDOW_TYPES.CUSTOM is used to allow for multiple custom windows */
    /* but lets be real i'll never use this feature */
    const createWindow = ({ type = WINDOW_TYPES.CUSTOM, id = type.toString(), custom_children = undefined, resizable = true }: CreateWindowParams) => {
        console.log("createWindow", type);
        const window = getWindowByType(type)
        if (window) {
            updateWindowState(window.id, WindowState.NORMAL);
            focusWindow(window.id);
            return;
        }
        const zIndex = zIndexCounter + 1;
        const children = custom_children || windowComponents[type];
        if (isMobile) {
            setWindows((prevWindows) => [...prevWindows, { id, type, children, state: WindowState.MAXIMIZED, zIndex, resizable: false }]);
        } else {
            setWindows((prevWindows) => [...prevWindows, { id, type, children, state: WindowState.NORMAL, zIndex, resizable }]);
        }
        setZIndexCounter(zIndex);
        setFocusedWindow(id);
    };

    const closeWindow = (id: string) => {
        console.log("closeWindow", id);
        setWindows((prevWindows) => prevWindows.filter((w) => w.id !== id));
        if (focusedWindow === id) {
            if (windows.length > 1) {
                setFocusedWindow(windows[windows.length - 1].id);
            } else {
                setFocusedWindow(null);
            }
        }
    };

    const updateWindowState = (id: string, state: WindowState) => {
        console.log("updateWindowState", id, state);
        if (isMobile && state === WindowState.NORMAL) {
            state = WindowState.MAXIMIZED;
        }
        setWindows((prevWindows) =>
            prevWindows.map((w) => (w.id === id ? { ...w, state } : w))
        );
        if (state === WindowState.MINIMIZED && focusedWindow === id) {
            setFocusedWindow(null);
        }
    };

    const focusWindow = (id: string) => {
        console.log("focusWindow", id);
        const newZIndex = zIndexCounter + 1;
        setWindows((prevWindows) =>
            prevWindows.map((w) =>
                w.id === id ? { ...w, zIndex: newZIndex } : w
            )
        );
        setZIndexCounter(newZIndex);
        setFocusedWindow(id);
    };

    return (
        <WindowContext.Provider
            value={{
                windows,
                createWindow,
                closeWindow,
                updateWindowState,
                focusedWindow,
                focusWindow,
                providerId,
            }}
        >
            {children}
        </WindowContext.Provider>
    );
};

export const useWindowContext = () => {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error("useWindowContext must be used within a WindowProvider");
    }
    return context;
};

