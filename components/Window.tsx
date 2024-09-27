import { useState, useEffect, useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import WindowHeader from './WindowHeader';
import { useWindowContext } from '@/contexts/WindowContext';
import Icons from '@/constants/icons';
import { useIsMobile } from '@/hooks/useIsMobile';

export enum WindowState {
    MINIMIZED,
    MAXIMIZED,
    NORMAL
}

type WindowProps = {
    id: string;
    key: string;
    children?: React.ReactNode;
    windowState: WindowState;
    zIndex?: number;
    focused?: boolean;
    resizable?: boolean;
}

export default function Window({ id, children, windowState, zIndex, focused, resizable = true }: WindowProps) {
    const { focusWindow, closeWindow, updateWindowState, providerId } = useWindowContext();

    const isMobile = useIsMobile();
    const [width, setWidth] = useState(640);
    const [height, setHeight] = useState(385);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [lastSize, setLastSize] = useState({ width: 640, height: 385 });
    const [lastPosition, setLastPosition] = useState({ x: 100, y: 100 });
    const [resizing, setResizing] = useState(false);

    const windowRef = useRef<HTMLDivElement>(null);
    const initialPosition = useRef({ x: 0, y: 0 });
    const initialSize = useRef({ width: 640, height: 385 });

    const exit = () => closeWindow(id);
    const minimize = () => updateWindowState(id, WindowState.MINIMIZED);
    const maximize = () => updateWindowState(id, windowState == WindowState.MAXIMIZED ? WindowState.NORMAL : WindowState.MAXIMIZED);

    const handleMouseDown = (e: React.MouseEvent) => {
        console.log("handleMouseDown");
        setResizing(true);
        initialPosition.current = { x: e.clientX, y: e.clientY };
        initialSize.current = { width, height };
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (resizing && windowRef.current) {
            const deltaX = e.clientX - initialPosition.current.x;
            const deltaY = e.clientY - initialPosition.current.y;

            const newWidth = initialSize.current.width + deltaX;
            const newHeight = initialSize.current.height + deltaY;

            if (newWidth > 200) setWidth(newWidth);
            if (newHeight > 150) setHeight(newHeight);
            setLastSize({ width: newWidth, height: newHeight });
        }
    };

    const handleMouseUp = () => {
        setResizing(false);
    };

    const handleFocus = () => {
        focusWindow(id);
    };

    const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
        setLastPosition({ x: data.x, y: data.y });
    };

    useEffect(() => {
        if (isMobile) {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            setPosition({ x: 0, y: 0 });
        }
    }, [isMobile]);

    useEffect(() => {
        if (resizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [resizing]);

    useEffect(() => {
        if (windowState === WindowState.MAXIMIZED) {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            setPosition({ x: 0, y: 0 });
        } else if (windowState === WindowState.NORMAL) {
            setWidth(lastSize.width);
            setHeight(lastSize.height);
            setPosition(lastPosition);
        }
    }, [windowState]);

    return (
        <Draggable
            handle={`.handle-${providerId}`}
            bounds="parent"
            onStart={handleFocus}
            onDrag={handleDrag}
            position={windowState === WindowState.MAXIMIZED ? { x: 0, y: 0 } : position}
            disabled={windowState === WindowState.MAXIMIZED}

        >
            <div
                ref={windowRef}
                className={`${windowState === WindowState.MINIMIZED ? "hidden shrink-fall-animation" : ""} absolute flex-col flex bg-c-light-gray border border-gray-800`}
                style={{ width, height, zIndex: zIndex || 0 }}
                onMouseDown={handleFocus}
            >
                <WindowHeader focused={focused} exit={exit} minimize={minimize} maximize={maximize} resizable={resizable} />
                <div className={`${focused ? "" : "blur-xsm"} overflow-y-scroll w-full h-full`} onMouseDown={handleFocus} >
                    {children}
                    {resizable &&
                        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-max" onMouseDown={handleMouseDown} >
                            <img src={Icons.RESIZE} className="w-4 h-4 select-none" draggable="false" />
                        </div>
                    }
                </div>
            </div>
        </Draggable>
    );
}

