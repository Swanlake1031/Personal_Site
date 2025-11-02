import React from 'react'

export default function ProgressLine(){
  const [w,setW]=React.useState(0)
  React.useEffect(()=>{
    const on=()=>{
      const s=window.scrollY
      const h=document.documentElement.scrollHeight-window.innerHeight
      setW(h>0? (s/h)*100:0)
    }
    on()
    window.addEventListener('scroll',on,{passive:true})
    return()=>window.removeEventListener('scroll',on)
  },[])
  return <div style={{position:'fixed',top:0,left:0,height:'2px',width:`${w}%`,background:'#000',zIndex:60}}/>
}


