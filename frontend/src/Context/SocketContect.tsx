import SocketIoClient from "socket.io-client";

import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// Web Socket Server
const WS_SERVER = "http://localhost:5000";

// Context for Socket : initialized as null
export const SocketContext = createContext<any|null>(null);

// Create Client side socket object to connect with server socket
const socket = SocketIoClient(WS_SERVER);

interface Props {
    children:React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({children}) => {
 
    const navigate = useNavigate(); 

    useEffect(()=>{
        const enterRoom = ({roomId}:{roomId:string})=>{
            navigate(`/room/${roomId}`);
        }
        socket.on('room-created',enterRoom);
    },[]);
 
 
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
}

