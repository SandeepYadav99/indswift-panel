import React from 'react';
import Lottie from 'react-lottie-player';


export default function Example({animation}) {
  return (
    <Lottie
      loop
      animationData={animation}
      play
      style={{ width: 70, height: 70,backgroundColor:"#2896e9",borderRadius:"10px"}}
    />
  )
}