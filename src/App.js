import { useEffect, useReducer } from 'react';

function App() {

  /* Reducer function. It takes a "command" from the invoked dispatch function, 
    and depending on what type it is, it updates the state. */
  function reducer(state, action) {
    console.log(action.type)
    switch (action.type) {
      case "start":
        return {
          ...state,
          isRunning: true
        }
      case "stop":
        return {
          ...state,
          isRunning: false
        }
      case "reset":
        return {
          isRunning: false,
          time: 0
        }
      case "tick":
        return {
          isRunning: true,
          time: state.time + 1
        }
      default:
        return {...state};
    }
  }

  // /* Initial state of the structure. When the component first runs, these states
  //   will have these values, and they will be updated by the reducer function, 
  //   according to the type of action issued by the dispatch function. */
  const initialState = {
    isRunning: false,
    time: 0
  }
  
  // /* Declaration of the useReducer hook. It takes the reducer function and the 
  //   initial states as props, and it returns an array which contains the current
  //   state and the dispatch function that changes this state. */
  const [state, dispatch] = useReducer(reducer, initialState);

  
  useEffect(() => {
    if (!state.isRunning) {
      return;
    }
    const id = setInterval(() => dispatch({type: 'tick'}), 1000);
    return () => {
      clearInterval(id);
      console.log("cleared interval");
    }
  }, [state.isRunning])



  return (
    <>
      <button onClick={() => dispatch({type:'start'})}>Start</button>
      <button onClick={() => dispatch({type:'stop'})}>Stop</button>
      <button onClick={() => dispatch({type:'reset'})}>Reset</button>

      <div>{state.time}</div>
    </>
  );
}

export default App;
