import { Box, Image, Text, Spacer } from "@chakra-ui/react";
import { cardStyles, imageStyles, textStyles } from "./BotCardStyle";

const BotCard = ({ name, imagePath, onClick }) => (
  <Box {...cardStyles} onClick={onClick}>
    <Image src={imagePath} alt={name} {...imageStyles} />
    <Spacer />
    <Text {...textStyles}>{name}</Text>
  </Box>
);

export default BotCard;
