import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OpponentSelector from "./components/app_components/opponent_selector/OpponentSelector";
import GameBoard from "./components/app_components/game_board/GameBoard";

export const AppContext = createContext();

const App = () => {
  const [selectedBot, setSelectedBot] = useState(null);

  return (
    <AppContext.Provider value={{ selectedBot, setSelectedBot }}>
      <Router>
        <Routes>
          <Route path="/" element={<OpponentSelector />} />
          <Route path="/game" element={<GameBoard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
