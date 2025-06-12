import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Wrap, WrapItem, VStack } from "@chakra-ui/react";
import { AppContext } from "../../../App";
import BotCard from "../bot_card/BotCard";
import {
  containerStyles,
  titleStackStyles,
  headingStyles,
  subtitleStyles,
} from "./OpponentSelectorStyle";

const bots = [
  { name: "CNN Bot", engineType: "cnn", image: "src/assets/cnn_bot.jpg" },
  { name: "HalfKA Bot", engineType: "halfka", image: "src/assets/halfka_bot.jpg" },
];

const OpponentSelector = () => {
  const navigate = useNavigate();
  const { setSelectedBot } = useContext(AppContext);

  const handleSelect = (bot) => {
    setSelectedBot(bot.engineType);
    navigate("/game");
  };

  return (
    <Box {...containerStyles}>
      <VStack {...titleStackStyles}>
        <Heading {...headingStyles}>Play Against KingCrab</Heading>
        <Text {...subtitleStyles}>Choose Your Opponent</Text>
      </VStack>
      <Wrap>
        {bots.map((bot) => (
          <WrapItem key={bot.engineType}>
            <BotCard
              name={bot.name}
              imagePath={bot.image}
              onClick={() => handleSelect(bot)}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default OpponentSelector;
