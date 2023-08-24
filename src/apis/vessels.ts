import Axios from "axios";

import Vessel from "@/models/Vessel";
import { Filter } from "@/models/Filter";
import { API_GATEWAY_URL } from "@/utils/constants";
import { requestParamsFromObject } from "@/utils/functions";

export const getAllVessels = async (filter: Filter) => {
  const response = await Axios.get(
    `${API_GATEWAY_URL}/vessels${requestParamsFromObject({ ...filter })}`
  );
  return response.data;
};

export const getVesselDetail = async (vesselCode: string) => {
  const response = await Axios.get(`${API_GATEWAY_URL}/vessels/${vesselCode}`);
  return response.data;
};

export const createVessel = async (vessel: Vessel) => {
  const response = await Axios.post(`${API_GATEWAY_URL}/vessels/create`, {
    ...vessel,
  });
  return response.data;
};

export const updateVessel = async (vessel: Vessel) => {
  const response = await Axios.patch(
    `${API_GATEWAY_URL}/vessels/${vessel.vsl_cd}`,
    {
      ...vessel,
    }
  );
  return response.data;
};

export const deleteVessel = async ({ vesselCode }: { vesselCode: string }) => {
  const response = await Axios.delete(
    `${API_GATEWAY_URL}/vessels/${vesselCode}`
  );
  return response.data;
};
