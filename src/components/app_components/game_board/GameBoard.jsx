import React, { useState, useContext } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import {
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { getBestMove } from "../../../api/engine";
import { AppContext } from "../../../App";
import { useNavigate } from "react-router-dom";

import {
  containerStyles,
  boardContainerStyles,
  overlayStyles,
  overlayBoxStyles,
  overlayTextStyles,
} from "./GameBoardStyle";

export default function GameBoard() {
  const navigate = useNavigate();
  const { selectedBot } = useContext(AppContext);

  const [game, setGame] = useState(new Chess());
  const [moveSquares, setMoveSquares] = useState({});
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [resultText, setResultText] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const safeGameMutate = (modify) => {
    let updated;
    setGame((prevGame) => {
      updated = new Chess(prevGame.fen());
      modify(updated);
      return updated;
    });
    return updated;
  };

  const parseEngineMove = (moveStr) => {
    if (moveStr === "0-0") return "O-O";
    if (moveStr === "0-0-0") return "O-O-O";

    let cleaned = moveStr.replace(/\s*e\.p\./i, "").replace(/[+#]$/, "");
    const promotionMatch = cleaned.match(/=([QRNB])/i);
    const promotion = promotionMatch ? promotionMatch[1].toLowerCase() : undefined;
    cleaned = cleaned.replace(/=([QRNB])/i, "");

    if (/^[KQRNB]/.test(cleaned)) cleaned = cleaned.slice(1);
    cleaned = cleaned.replace("x", "");

    const from = cleaned.slice(0, 2);
    const to = cleaned.slice(2, 4);

    const moveObj = { from, to };
    if (promotion) moveObj.promotion = promotion;

    return moveObj;
  };

  const handleEngineMove = async (chessInstance) => {
    if (!chessInstance) return;
    const fen = chessInstance.fen();

    try {
      const bestMove = await getBestMove(selectedBot, fen);
      if (!bestMove) return;

      const moveObj = parseEngineMove(bestMove);
      const updated = safeGameMutate((g) => {
        const result = g.move(moveObj);
        if (!result) {
          console.error("Invalid move from engine:", moveObj, "on FEN:", g.fen());
        }
      });

      checkGameOver(updated);
    } catch (error) {
      console.error("Engine move failed:", error);
      setResultText("Game Over. You won by checkmate!");
      setGameOver(true);
    }
  };

  const checkGameOver = (chessInstance) => {
    if (!chessInstance) return;
    if (chessInstance.isGameOver()) {
      let message = "Game Over. ";
      if (chessInstance.isCheckmate()) {
        message += chessInstance.turn() === "w" ? "You lost by checkmate." : "You won by checkmate!";
      } else if (chessInstance.isDraw()) {
        message += "It's a draw.";
      } else {
        message += "Unrecognized end state.";
      }
      setResultText(message);
      setGameOver(true);
    }
  };

  const getLegalMoves = (square) => {
    const moves = game.moves({ square, verbose: true });
    const newSquares = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to)
            ? "radial-gradient(circle, #ff6961 40%, transparent 40%)"
            : "radial-gradient(circle, #90ee90 40%, transparent 40%)",
        borderRadius: "50%",
      };
    });
    setMoveSquares(newSquares);
    return moves;
  };

  const onSquareClick = async (square) => {
    if (gameOver || game.turn() !== "w") return;

    if (selectedSquare) {
      const moves = game.moves({ square: selectedSquare, verbose: true });
      const move = moves.find((m) => m.to === square);

      if (move) {
        const updated = await new Promise((resolve) => {
          setGame((prevGame) => {
            const updatedGame = new Chess(prevGame.fen());
            updatedGame.move({ from: move.from, to: move.to, promotion: "q" });
            resolve(updatedGame);
            return updatedGame;
          });
        });

        setSelectedSquare(null);
        setMoveSquares({});
        checkGameOver(updated);

        if (!updated?.isGameOver()) {
          await handleEngineMove(updated);
        }
        return;
      }

      setSelectedSquare(null);
      setMoveSquares({});
    } else {
      const piece = game.get(square);
      if (piece && piece.color === "w") {
        setSelectedSquare(square);
        getLegalMoves(square);
      }
    }
  };

  return (
    <Box {...containerStyles}>
      <Box {...boardContainerStyles}>
        <Chessboard
          position={game.fen()}
          onSquareClick={onSquareClick}
          boardOrientation="white"
          customSquareStyles={moveSquares}
          arePiecesDraggable={false}
          boardWidth={600}
        />

        {gameOver && (
          <Box {...overlayStyles}>
            <Box {...overlayBoxStyles}>
              <Text {...overlayTextStyles}>{resultText}</Text>
              <Button colorScheme="teal" onClick={() => navigate("/")}>
                Return to Main Menu
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
