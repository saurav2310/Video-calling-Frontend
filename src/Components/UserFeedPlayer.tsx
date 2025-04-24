import { useEffect, useRef } from "react";

const UserFeedPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            console.log("Setting stream to video", stream);
            console.log("Stream tracks:", stream.getTracks()); // Debugging track
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video
            ref={videoRef}
            style={{ width: '300px', height: 200 }}
            muted={true}
            autoPlay
            playsInline
        />
    );
};


export default UserFeedPlayer;
