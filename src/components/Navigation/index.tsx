import "./navigation.scss";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Navigation = () => {
  return (
    <div className="navigation">
      <Stack direction="row" spacing={2}>
        <Button id="basic-button">Launches</Button>
        <Button id="basic-button">Cards</Button>
        <Button id="basic-button">Rockets</Button>
      </Stack>
    </div>
  );
};

export default Navigation;
