import "./launches.scss";

import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LaunchCard from "../../components/LaunchCard";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_LAUNCHES } from "../../queries";
import { Launch } from "../../interfaces/launch";

interface LaunchesData {
  launches: Launch[];
}

const Launches = () => {
  const [fetchLaunches, { data, loading }] =
    useLazyQuery<LaunchesData>(GET_LAUNCHES);

  const [offset, setOffset] = useState<number>(12);
  const [launchesResult, setLaunchesResult] = useState<Launch[]>([]);

  useEffect(() => {
    !data &&
      fetchLaunches({
        variables: { limit: 9, offset: offset },
      });
  });

  useEffect(() => {
    if (data) {
      setLaunchesResult((r) => r.concat(data.launches));
      setOffset((o) => o + data.launches.length);
    }
  }, [data]);

  const loadNextLaunches = () => {
    fetchLaunches({
      variables: { limit: 9, offset: offset },
    });
  };

  const loader = (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width={260} height={140} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="rounded" width={260} height={200} />
      <Stack spacing={1} direction="row">
        <Skeleton variant="rounded" width={85} height={30} />
        <Skeleton variant="rounded" width={110} height={30} />
      </Stack>
    </Stack>
  );

  return (
    <div className="launches">
      <Stack spacing={5}>
        <div className="launches__results">
          <span>Launch Results</span>
          <FormControl>
            <InputLabel id="sort">Sort by</InputLabel>
            <Select
              labelId="sort"
              id="sort"
              value={1}
              label="Sort by"
              onChange={() => {}}
            >
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <MenuItem value={3}>Option 3</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {loading && Array.from(Array(6)).map(() => loader)}
          {launchesResult &&
            launchesResult.map((launch: Launch, index: number) => {
              return (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                  <LaunchCard launch={launch} />
                </Grid>
              );
            })}
        </Grid>
        <Button size="small" onClick={loadNextLaunches}>
          Load More
        </Button>
      </Stack>
    </div>
  );
};

export default Launches;
