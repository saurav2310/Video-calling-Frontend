export const ADD_PEER = "ADD_PEER" as const;
export const REMOVE_PEER = "REMOVE_PEER" as const;

export const addPeerAction = (peerId:string, stream:MediaStream)=>({
    payload:{peerId,stream},
    type:ADD_PEER
});
export const removePeerAction = (peerId:string)=>({
    payload:{peerId},
    type:REMOVE_PEER
});