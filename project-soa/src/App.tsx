import { Route, Routes } from "react-router";
import { HomePage } from "./routes/home/HomePage";


function App() {
  return (
    <Routes>
       <Route path="/home" element={<HomePage/>} />,
    </Routes>
  )
}

export default App
