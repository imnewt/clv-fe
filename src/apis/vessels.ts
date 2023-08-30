import Axios from "axios";

import Vessel from "@/models/Vessel";
import { Filter } from "@/models/Filter";
import { API_GATEWAY_URL } from "@/utils/constants";
import { requestParamsFromObject } from "@/utils/functions";

export const getAllVessels = async (filter: Filter) => {
  const response = await Axios.get(
    `${API_GATEWAY_URL}/vessel-service/vessels${requestParamsFromObject({
      ...filter,
    })}`
  );
  return response.data;
};

export const getVesselDetail = async (vesselId: string) => {
  const response = await Axios.get(
    `${API_GATEWAY_URL}/vessel-service/vessels/${vesselId}`
  );
  return response.data;
};

export const createVessel = async (vessel: Vessel) => {
  const response = await Axios.post(
    `${API_GATEWAY_URL}/vessel-service/vessels/create`,
    {
      ...vessel,
    }
  );
  return response.data;
};

export const updateVessel = async (vessel: Vessel) => {
  const response = await Axios.patch(
    `${API_GATEWAY_URL}/vessel-service/vessels/${vessel.id}`,
    {
      ...vessel,
    }
  );
  return response.data;
};

export const deleteVessel = async ({ vesselId }: { vesselId: string }) => {
  const response = await Axios.delete(
    `${API_GATEWAY_URL}/vessel-service/vessels/${vesselId}`
  );
  return response.data;
};
