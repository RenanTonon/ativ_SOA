import { Route, Routes } from "react-router";
import HomePage from "./routes/home/HomePage";
import RankingPage from "./routes/ranking/RankingPage";
import LocalidadePage from "./routes/localidade/LocalidadePage";
import ComparacaoPage from "./routes/comparacao/ComparacaoPage";



function App() {
  return (
    <Routes>
       <Route path="/home" element={<HomePage/>} />,
       <Route path="/ranking" element={<RankingPage/>} />,
       <Route path="/localidade" element={<LocalidadePage/>} />,
       <Route path="/comparacao" element={<ComparacaoPage/>} />,
    </Routes>
  )
}

export default App
