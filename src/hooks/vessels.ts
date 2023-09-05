import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { get } from "lodash";

import Vessel from "@/models/Vessel";
import { Filter } from "@/models/Filter";
import {
  createVessel,
  deleteVessel,
  getAllVessels,
  getVesselDetail,
  updateVessel,
} from "@/apis/vessels";
import { DEFAULT_FILTER } from "@/utils/constants";
import { useShowError } from "@/utils/hooks";

export const useGetAllVessels = (filter: Filter = DEFAULT_FILTER) => {
  const { data, isLoading } = useQuery<{ vessels: Vessel[]; total: number }>(
    ["get_all_vessels", filter],
    () => getAllVessels(filter)
  );
  return {
    vessels: data?.vessels,
    total: data?.total,
    isLoadingVessels: isLoading,
  };
};

export const useGetVesselDetail = ({
  vesselId,
  enabled = true,
}: {
  vesselId: string;
  enabled?: boolean;
}): { vessel: Vessel; isLoadingVesselDetail: boolean } => {
  const { data, isLoading } = useQuery(
    ["get_vessel_detail", vesselId],
    () => getVesselDetail(vesselId),
    {
      enabled,
    }
  );
  return { vessel: data, isLoadingVesselDetail: isLoading };
};

export const useCreateVessel = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { showError } = useShowError();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createVessel, {
    onSuccess: () => {
      message.success("Create Vessel Successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessages = get(error, "response.data.errors") || [];
      showError("Create Vessel Failed!", errorMessages);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_vessels"] });
    },
  });

  return { createVessel: mutate, isCreatingVessel: isLoading };
};

export const useUpdateVessel = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { showError } = useShowError();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateVessel, {
    onSuccess: () => {
      message.success("Update Vessel Successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessages = get(error, "response.data.errors") || [];
      showError("Update Vessel Failed!", errorMessages);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_vessels"] });
    },
  });

  return { updateVessel: mutate, isUpdatingVessel: isLoading };
};

export const useDeleteVessel = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { showError } = useShowError();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteVessel, {
    onSuccess: () => {
      message.success("Delete Vessel Successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessages = get(error, "response.data.errors") || [];
      showError("Delete Vessel Failed!", errorMessages);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_vessels"] });
    },
  });

  return { deleteVessel: mutate, isDeletingVessel: isLoading };
};
