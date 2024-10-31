export interface Launch {
  links: Links;
  id: string;
  launch_date_local: Date;
  mission_name: string;
  rocket: LaunchRocket;
  details?: string;
  launch_site: LaunchSite;
  launch_success: boolean;
}

export interface Links {
  flickr_images?: string[];
}

export interface LaunchRocket {
  rocket: Rocket;
  rocket_name: string;
}

export interface Rocket {
  mass: Mass;
}

export interface Mass {
  kg: number;
}

export interface LaunchSite {
  site_name: string;
}
