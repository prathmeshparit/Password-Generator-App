import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react"


function App() {
 
  const[length,setLength] =useState(8);
  const[numberAllow,setNumberAllow] = useState(false);
  const[charAllow,setCharAllow] = useState(false);
  const[password, setPassword] = useState("");


  const passGenerator=useCallback( () =>
  {
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if(numberAllow) str +="0123456789"
      if(charAllow) str +="!@#$%^&*()_-+=./?~[]{},"

      for(let i=1 ; i<= length;i++)
      {
        let char = Math.floor(Math.random() * str.length +1);
        pass += str.charAt(char);


      }

      setPassword(pass);
  },[length,numberAllow,charAllow,setPassword]);

  useEffect(
    () => { passGenerator()} ,[length,numberAllow,charAllow,passGenerator] 
    )

  const passref = useRef(null)
  
  const cpcb = useCallback( () => {
    passref.current?.select();

    passref.current?.setSelectionRange(0,89);
    window.navigator.clipboard.writeText(password);


  },[password])
  
  
  
  
  
  
      return (
    <>
      <div className=' w-full max-w-lg mx-auto shadow-md rounded-lg
      pt-5 px-4 my-8 text-orange-500 bg-gray-700'> 

      <h1 className='text-center text-[2em] text-white pb-3'>Password Generator </h1>



      <div className='className="flex shadow
       rounded-lg overflow-hidden mb-4"'>

      <input  type="text" value={password} 
      placeholder="password"
      className=' outline-none w-[26rem] py-1 px-3'
      readOnly
      ref={passref}
      />
      <button onClick={cpcb}
       className='   text-lg mb-3 outline-none bg-blue-700 text-white
      pt-1  px-3 py-0.5 shrink-0'>
      copy
      </button>
               
      </div>
      
      <div className='flex text-lg gap-x-2 '>
                  <div className='flex item-center gap-x-1 py-3'>
                        <input type="range" min={6} max={100} value={length}
                        className='cursor-pointer '
                        onChange={(e) => setLength(e.target.value)}/>
                        <label>Length : {length}</label>
                  </div>

                  <div className='flex items-center gap-x-1 mb-3 py-3'>
                   <input type="checkbox" 
                    defaultChecked={numberAllow}
                    id="numberInput"
                    onChange={() =>{
                      setNumberAllow(c => !c);
                    } } / >
                         <label>Numbers : { numberAllow}</label>
                  </div>



                  <div className='flex items-center gap-x-1  mb-3 py-3'>
                   <input type="checkbox" 
                    defaultChecked={charAllow}
                    id="CharacterInput"
                    onChange={() =>{
                      setCharAllow(c => !c);
                    } } / >
                         <label>Characters : {charAllow}</label>
                  </div>



                </div>

        </div>
    </>
  )
}

export default App
