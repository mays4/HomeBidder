import { useState } from "react";

function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 
//history saving
//if true replace the history
  const transition = (newMode, replace = false) => {
    if (newMode !== mode) {
      setMode(newMode);
      (replace ? 
        newMode = history[history.length - 1] 
        : setHistory(prev => ([...prev, newMode]))
      );
    }
    
  }
//go back to previous history state
  const back = () => {
    const historyCopy = [...history];
    if (historyCopy.length > 1) {
      historyCopy.pop()
      setMode(historyCopy[historyCopy.length - 1]);
      setHistory(historyCopy);
    }
  }

  return { mode , transition, back};
}
export default useVisualMode;