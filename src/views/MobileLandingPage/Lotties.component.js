import React from 'react';
import Lottie from 'react-lottie-player';


export default function Example({animation}) {
  return (
    <Lottie
      loop
      animationData={animation}
      play
      style={{ width: 60, height: 60,backgroundColor:"#2896e9",borderRadius:"10px"}}
    />
  )
}