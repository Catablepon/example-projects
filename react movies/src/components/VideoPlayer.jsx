import React from "react";
import Youtube from 'react-youtube'

const VideoPlayer = (videoid) => {
    const opts = {
        height:'390',
        width:'640',
        playerVars: {
            autoplay: 0,
        }
    }

    const onReady = (event) => {
        event.target.pauseVideo()
    }

    return <Youtube videoId={videoid} opts={opts} onReady={onReady} />
}

export default VideoPlayer