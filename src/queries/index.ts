import { gql } from "@apollo/client";

export const GET_LAUNCHES = gql`
  query getLaunches($limit: Int, $offset: Int) {
    launches(limit: $limit, offset: $offset) {
      links {
        flickr_images
      }
      id
      details
      launch_date_local
      mission_name
      rocket {
        rocket {
          mass {
            kg
          }
          first_stage {
            fuel_amount_tons
          }
          second_stage {
            fuel_amount_tons
          }
        }
      }
    }
  }
`;

export const GET_LAUNCH = gql`
  query Launch($launchId: ID!) {
    launch(id: $launchId) {
      details
      mission_name
      launch_date_local
      launch_site {
        site_name
      }
      launch_success
      links {
        flickr_images
      }
      rocket {
        rocket_name
        rocket {
          mass {
            kg
          }
        }
      }
    }
  }
`;
