import { useEffect, useRef, useState } from "react";

const UserFeedPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [isMuted, setIsMuted] = useState(true);
    const [isVideoPaused, setIsVideoPaused] = useState(false);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const toggleMute = () => {
        if (!stream) return;
        stream.getAudioTracks().forEach(track => {
            track.enabled = !track.enabled;
        });
        setIsMuted(prev => !prev);
    };

    const toggleVideo = () => {
        if (!stream) return;
        stream.getVideoTracks().forEach(track => {
            track.enabled = !track.enabled;
        });
        setIsVideoPaused(prev => !prev);
    };

    return (
        <div className="flex flex-col items-center">
            <video
                ref={videoRef}
                className="rounded-lg shadow-lg w-72 h-48 object-cover"
                muted
                autoPlay
                playsInline
            />
            <div className="mt-4 flex gap-4">
                <button
                    onClick={toggleMute}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
                >
                    {isMuted ? '🎤 Unmute' : '🔇 Mute'}
                </button>
                <button
                    onClick={toggleVideo}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
                >
                    {isVideoPaused ? '🎥 Resume' : '⏸ Pause'}
                </button>
            </div>
        </div>
    );
};

export default UserFeedPlayer;
