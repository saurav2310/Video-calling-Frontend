import { ADD_PEER,REMOVE_PEER } from "../Actions/PeerAction";

export type PeerState = Record<string,{stream:MediaStream}>;

type peerAction = {
    payload:{peerId:string, stream:MediaStream},
    type: typeof ADD_PEER,
} | {
    payload:{peerId:string},
    type: typeof REMOVE_PEER,
}

export const peerReducer = (state:PeerState,action:peerAction)=>{
switch(action.type){
    case ADD_PEER:
        return {...state,[action.payload.peerId]:{stream:action.payload.stream}}
    case REMOVE_PEER:

    default:
        return {...state};
}
}