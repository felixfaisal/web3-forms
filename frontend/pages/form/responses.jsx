import React from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'


const Responses = () => {
  const [userResponses, setUserResponses] = useLocalStorage("userResponses","");
  // RESPONSES CAN BE ACCESSED FORM ANYWHERE IN THE APP by using this above line as they are being stored in localStorage
  console.log(userResponses)
  return (
    <>
      {JSON.stringify(userResponses)}
      {/* Can clear all userResponses using localStorage.clear() */}
    </>
  )
}

export default Responses