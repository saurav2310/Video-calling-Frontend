import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContect";
import UserFeedPlayer from "../Components/UserFeedPlayer";

const Room: React.FC = () => {
    const { id } = useParams();
    const { socket, user, stream, peers } = useContext(SocketContext);

    const [pinnedStream, setPinnedStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        if (user) {
            socket.emit('joined-room', { roomId: id, peerId: user._id });
        }
    }, [id, user, socket]);

    const handlePin = (stream: MediaStream) => {
        setPinnedStream(stream);
    };

    return (
        <div className="p-4 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Room: {id}</h2>

            {/* Pinned Video Section */}
            {pinnedStream && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Pinned User</h3>
                    <UserFeedPlayer stream={pinnedStream} />
                </div>
            )}

            {/* Your Own Feed */}
            <div className="mb-6 cursor-pointer" onClick={() => handlePin(stream)}>
                <h3 className="text-lg font-semibold mb-2">Your Feed</h3>
                <UserFeedPlayer stream={stream} />
            </div>

            {/* Other Users */}
            <div className="flex flex-wrap gap-4 justify-center">
                {Object.keys(peers).map((peerId) => {
                    const peer = peers[peerId];
                    console.log("Rendering peer", peerId, peer);

                    return (
                        <div 
                            key={peerId} 
                            className="cursor-pointer"
                            onClick={() => handlePin(peer.stream)}
                        >
                            <UserFeedPlayer stream={peer.stream} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Room;
