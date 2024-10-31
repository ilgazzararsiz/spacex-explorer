import "./consumption-modal.scss";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Launch } from "../../interfaces/launch";
import { calculateEnergyConsumption } from "../../utils";

interface ConsumptionModalProps {
  open: boolean;
  handleClose: () => void;
  launch: Launch;
}

const ConsumptionModal = ({
  open,
  handleClose,
  launch,
}: ConsumptionModalProps) => {
  const energyConsumption = calculateEnergyConsumption(launch);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="consumption-modal-title"
      aria-describedby="consumption-modal-description"
    >
      <Box className="consumption-modal__box">
        <Typography id="consumption-modal-title" variant="h6" component="h2">
          {launch.mission_name} launch uses approximetely:
        </Typography>
        <Typography id="consumption-modal-description" sx={{ mt: 2 }}>
          {energyConsumption} Joules/KG
        </Typography>
      </Box>
    </Modal>
  );
};

export default ConsumptionModal;
