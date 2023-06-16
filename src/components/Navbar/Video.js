import React from 'react';
import video from './backVideo.mp4';
import './Video.css';

function Video() {
  return (
    <div className="backgrounds">
         <video autoPlay loop muted>
            <source src={video} type="video/mp4"/>
        </video>
    </div>
  )
}

export default Video