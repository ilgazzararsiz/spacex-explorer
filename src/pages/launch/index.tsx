import "./launch-detail.scss";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { GET_LAUNCH } from "../../queries";
import { useNavigate, useParams } from "react-router-dom";
import defaultLaunchMedia from "../../assests/images/spacex-launch.jpg";
import { Button, Chip, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Launch } from "../../interfaces/launch";
import { calculateEnergyConsumption } from "../../utils";

enum ChipColor {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

interface LaunchData {
  launch: Launch;
}

const LaunchDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery<LaunchData>(GET_LAUNCH, {
    variables: { launchId: id },
  });

  const navigateBack = () => {
    navigate(-1);
  };

  const getSuccessChip = () => {
    if (data?.launch.launch_success === null) {
      return { color: ChipColor.WARNING, text: "Launch Status Unknown" };
    }
    return data?.launch.launch_success
      ? { color: ChipColor.SUCCESS, text: "Successful" }
      : { color: ChipColor.ERROR, text: "Failed" };
  };

  return (
    <div className="launch-detail">
      <div className="launch-detail__back-button">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={navigateBack}
        >
          Back
        </Button>
      </div>
      {data && (
        <Card>
          <CardMedia
            component="img"
            height="250"
            image={
              Array.isArray(data.launch.links.flickr_images) &&
              data.launch.links.flickr_images.length > 0
                ? data.launch.links.flickr_images[0]
                : defaultLaunchMedia
            }
            alt="green iguana"
          />
          <CardContent>
            <div className="launch-detail__title-container">
              <Typography gutterBottom variant="h4" component="div">
                {data.launch.mission_name}
              </Typography>
              <Chip
                label={getSuccessChip().text}
                color={getSuccessChip().color}
              />
            </div>
            <Typography
              variant="overline"
              gutterBottom
              sx={{ display: "block" }}
            >
              {new Date(data.launch.launch_date_local).toLocaleString()}
            </Typography>
            {data.launch.launch_site && data.launch.launch_site.site_name && (
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                Site Name: {data.launch.launch_site.site_name}
              </Typography>
            )}
            <Divider />
            {data.launch.rocket && data.launch.rocket.rocket_name && (
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                Rocket Name: {data.launch.rocket.rocket_name}
              </Typography>
            )}
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Energy Consumption: {calculateEnergyConsumption(data.launch)}{" "}
              Joules/KG
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                paddingTop: 2,
                paddingBottom: 2,
              }}
            >
              {data.launch.details}
            </Typography>
            {Array.isArray(data.launch.links.flickr_images) &&
              data.launch.links.flickr_images.length > 0 && (
                <>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ paddingTop: 2 }}
                  >
                    Launch Images
                  </Typography>
                  <ImageList cols={3}>
                    {data.launch.links.flickr_images.map(
                      (image: string, index: number) => (
                        <ImageListItem key={index}>
                          <img src={image} alt="launch" loading="lazy" />
                        </ImageListItem>
                      )
                    )}
                  </ImageList>
                </>
              )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LaunchDetail;
