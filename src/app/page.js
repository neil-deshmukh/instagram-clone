"use client"

import { useState } from "react";
import { LoginContext } from "./loginContext";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import Home from "./components/Home";

export default function App() {
  const [isModal, setIsModal] = useState(false)
  return (
    <div>
      <LoginContext.Provider value={{ setIsModal }}>
        <Navbar />
        <Home />
      </LoginContext.Provider>
      {isModal && <Modal setIsModal={setIsModal} />}
    </div>
  )
}
