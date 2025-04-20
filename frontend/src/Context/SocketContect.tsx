import SocketIoClient from "socket.io-client";

import { createContext } from "react";


// Web Socket Server
const WS_SERVER = "http://localhost:5000";

// Context for Socket : initialized as null
const SocketContext = createContext<any|null>(null);

// Create Client side socket object to connect with server socket
const socket = SocketIoClient(WS_SERVER);

interface Props {
    children:React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({children}) => {
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
}

