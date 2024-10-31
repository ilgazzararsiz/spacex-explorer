import { Launch } from "../interfaces/launch";

export const calculateEnergyConsumption = (launch: Launch) => {
  /*
   *The consumed energy depends only on the mass of the rocket that was used for the launch + the mass of the fuel
   *It costs about 15 kg of fuel bring 1 kg of mass to the Lower Earth Orbit
   *The fuel has an energetic value of 1.35*10^7 Joules / kg
   */
  const JOULES_PER_KG = 1.35 * Math.pow(10, 7);
  const FUEL_PER_KG = 15;

  const massOfRocket = launch.rocket.rocket.mass.kg;
  const fuelConsumption = massOfRocket * FUEL_PER_KG;

  return fuelConsumption * JOULES_PER_KG;
};
