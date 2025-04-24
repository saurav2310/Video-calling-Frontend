import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContect";
import UserFeedPlayer from "../Components/UserFeedPlayer";

const Room: React.FC = () => {
    const {id} = useParams();

    const {socket,user,stream,peers} = useContext(SocketContext);

    useEffect(()=>{
        if(user) {
            socket.emit('joined-room',{roomId:id,peerId:user._id})
        };
    },[id,user,socket]);
    return (
        <div className="">
            Room : {id}
            <br />
            Your Feed
            <UserFeedPlayer stream={stream} />
            <div>
                Other user feed
                {Object.keys(peers).map((peerId) => {
                    const peer = peers[peerId];
                    console.log("Rendering peer", peerId, peer); // 👈 Add this
                    return (
                        <UserFeedPlayer key={peerId} stream={peer.stream}  />
                    );
                })}
            </div>
        </div>
    );
}

export default Room;