import SocketIoClient from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from 'peerjs';
import {v4 as UUIDv4} from "uuid";


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

    const [user,setUser]=useState<Peer>();

    const [stream,setStream]=useState<MediaStream>();




    const fetchParticipantsList = ({roomId, participants}:{roomId:string,participants:string[]})=>{
        
        console.log("Fetched room");
        console.log(roomId,participants);
    };


    const fetchUserFeed = async ()=>{
        const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        setStream(stream);
    }


    useEffect(()=>{

        const userId = UUIDv4();
        const newPeer = new Peer(userId,{
            host:"localhost",
            port:9000,
            path:'/myapp'
        });

    
        setUser(newPeer);
        fetchUserFeed();
        const enterRoom = ({roomId}:{roomId:string})=>{
            navigate(`/room/${roomId}`);
        }
        socket.on('room-created',enterRoom);
        socket.on('get-users',fetchParticipantsList);
    },[]);
 
 
    return (
        <SocketContext.Provider value={{socket,user,stream}}>
            {children}
        </SocketContext.Provider>
    );
}



