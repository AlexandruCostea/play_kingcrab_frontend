import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getBestMove = async (engine_type, fen) => {
  const res = await axios.post(`${API}/get_best_move`, {
    engine_type,
    fen
  })
  return res.data.best_move;
};
