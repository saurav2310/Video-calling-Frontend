import SocketIoClient from "socket.io-client";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer, {MediaConnection} from 'peerjs';
import {v4 as UUIDv4} from "uuid";
import { peerReducer } from "../Reducers/peerReducer";
import { addPeerAction } from "../Actions/PeerAction";


// Web Socket Server
const WS_SERVER = "video-calling-backend-production.up.railway.app";

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

    const [peers,dispatch] = useReducer (peerReducer,{});



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
            host:"peerjs-production-922d.up.railway.app",
            path:'/',
            port: 443,
            secure: true 
        });

    
        setUser(newPeer);
        fetchUserFeed();
        const enterRoom = ({roomId}:{roomId:string})=>{
            navigate(`/room/${roomId}`);
        }
        socket.on('room-created',enterRoom);
        socket.on('get-users',fetchParticipantsList);
    },[]);

    useEffect(()=>{
        if(!user||!stream) return;


        const handleUserJoined = ({ peerId }: { peerId: string }) => {
            console.log("Calling new peer:", peerId);
            const call = user.call(peerId, stream);
            call.on("stream", (remoteStream) => {
                console.log("Got remote stream from", peerId);
                dispatch(addPeerAction(peerId, remoteStream));
            });
        };

        const handleCall = (call: MediaConnection) => {
            console.log("Receiving call from", call.peer);
            call.answer(stream);
            call.on("stream", (remoteStream:MediaStream) => {
                console.log("Answer received remote stream from", call.peer);
                dispatch(addPeerAction(call.peer, remoteStream));
            });
        };
        
        socket.on('user-joined',handleUserJoined);

        user.on('call',handleCall);

        socket.emit('ready');
    },[user,stream]);
 
    return (
        <SocketContext.Provider value={{socket,user,stream,peers}}>
            {children}
        </SocketContext.Provider>
    );
}



