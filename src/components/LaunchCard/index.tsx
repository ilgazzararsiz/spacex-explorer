import "./launch-card.scss";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Launch } from "../../interfaces/launch";
import defaultLaunchMedia from "../../assests/images/spacex-launch.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConsumptionModal from "../ConsumptionModal";

interface LaunchCardProps {
  launch: Launch;
}

const LaunchCard = ({ launch }: LaunchCardProps) => {
  const navigate = useNavigate();
  const [consumptionModalOpen, setConsumptionModalOpen] =
    useState<boolean>(false);

  const openConsumptionModal = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setConsumptionModalOpen(true);
  };

  const closeConsumptionModal = () => setConsumptionModalOpen(false);

  const defaultDetail =
    "This launch marks another step forward in SpaceX's mission to advance space technology and increase accessibility to space. Leveraging cutting-edge rocket technology, each mission brings us closer to a future of sustained and affordable space exploration";

  const navigateToLaunchDetail = () => {
    navigate(`/launch/${launch.id}`);
  };

  return (
    <div className="launch-card">
      <ConsumptionModal
        open={consumptionModalOpen}
        handleClose={closeConsumptionModal}
        launch={launch}
      />
      <Card sx={{ maxWidth: 345 }}>
        <div onClick={navigateToLaunchDetail}>
          <CardMedia
            sx={{ height: 140 }}
            image={
              Array.isArray(launch.links.flickr_images) &&
              launch.links.flickr_images.length > 0
                ? launch.links.flickr_images[0]
                : defaultLaunchMedia
            }
            title={launch.mission_name}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ height: 30, overflow: "hidden" }}
            >
              {launch.mission_name}
            </Typography>
            <Typography
              variant="overline"
              gutterBottom
              sx={{ display: "block" }}
            >
              {new Date(launch.launch_date_local).toLocaleString()}
            </Typography>
            <div className="launch-card__details">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {launch.details || defaultDetail}
              </Typography>
            </div>
          </CardContent>
        </div>
        <CardActions>
          <Button size="small">+ Compare</Button>
          <Button size="small" onClick={openConsumptionModal}>
            Consumption
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default LaunchCard;
