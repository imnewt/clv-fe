import { useEffect, useCallback, useMemo } from "react";
import { Modal, Form, Input, Spin, InputNumber } from "antd";
import { useForm } from "antd/lib/form/Form";

import {
  useCreateVessel,
  useGetVesselDetail,
  useUpdateVessel,
} from "@/hooks/vessels";
import { getCurrentUser } from "@/utils/functions";

interface CreateUpdateVesselModalProps {
  vesselId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MAXIMUM_VSL_CODE_LENGTH = 4;
export const MAXIMUM_VSL_NAME_LENGTH = 50;
export const MAXIMUM_REGISTRATION_NUMBER_LENGTH = 15;
export const MAXIMUM_PHONE_NUMBER_LENGTH = 20;
export const MAXIMUM_FAX_NUMBER_LENGTH = 20;
export const MAXIMUM_TELEX_NUMBER_LENGTH = 20;
export const MAXIMUM_EMAIL_LENGTH = 50;
export const MAXIMUM_PI_CLUB_DESCRIPTION_LENGTH = 100;
export const MAXIMUM_REGISTRATION_PORT_CODE_LENGTH = 5;
export const MAXIMUM_CLASS_NUMBER_REGISTER_AREA_NAME_LENGTH = 20;
export const MAXIMUM_VESSEL_CLASS_NUMBER_LENGTH = 10;
export const MAXIMUM_VESSEL_BUILDER_NAME_LENGTH = 50;
export const MAXIMUM_CARRIER_CODE_LENGTH = 3;

const CreateUpdateVesselModal = ({
  vesselId,
  isOpen,
  onClose,
}: CreateUpdateVesselModalProps) => {
  const [form] = useForm();
  const currentUserId = getCurrentUser();

  const { vessel, isLoadingVesselDetail } = useGetVesselDetail({
    vesselId,
    enabled: isOpen && !!vesselId,
  });

  const handleClose = useCallback(() => {
    form.resetFields();
    onClose();
  }, [form, onClose]);

  const isCreate = useMemo(() => !vesselId, [vesselId]);

  const { createVessel, isCreatingVessel } = useCreateVessel({
    onSuccess: handleClose,
  });
  const { updateVessel, isUpdatingVessel } = useUpdateVessel({
    onSuccess: handleClose,
  });

  useEffect(() => {
    if (vesselId && vessel) {
      form.setFieldsValue({
        vsl_cd: vessel.vsl_cd,
        vsl_eng_nm: vessel.vsl_eng_nm,
        vsl_locl_nm: vessel.vsl_locl_nm,
        foil_capa: vessel.foil_capa,
        doil_capa: vessel.doil_capa,
        frsh_wtr_capa: vessel.frsh_wtr_capa,
        rgst_no: vessel.rgst_no,
        phn_no: vessel.phn_no,
        fax_no: vessel.fax_no,
        tlx_no: vessel.tlx_no,
        vsl_eml: vessel.vsl_eml,
        piclb_desc: vessel.piclb_desc,
        rgst_port_cd: vessel.rgst_port_cd,
        clss_no_rgst_area_nm: vessel.clss_no_rgst_area_nm,
        vsl_clss_no: vessel.vsl_clss_no,
        vsl_bldr_nm: vessel.vsl_bldr_nm,
        loa_len: vessel.loa_len,
        lbp_len: vessel.lbp_len,
        crr_cd: vessel.crr_cd,
        pnm_net_tong_wgt: vessel.pnm_net_tong_wgt,
      });
    }
  }, [form, vesselId, vessel]);

  const handleSubmit = useCallback(async () => {
    const [values] = await Promise.all([form.validateFields()]);
    if (isCreate) {
      createVessel({
        ...values,
        cre_usr_id: currentUserId,
        upd_usr_id: currentUserId,
      });
    } else {
      updateVessel({
        ...vessel,
        ...values,
        upd_usr_id: currentUserId,
      });
    }
  }, [isCreate, form, vessel, currentUserId, createVessel, updateVessel]);

  return (
    <Modal
      open={isOpen}
      title={isCreate ? "Create New Vessel" : "Update Vessel"}
      okText={isCreate ? "Create" : "Update"}
      okType="default"
      okButtonProps={{
        className: "bg-blue-500 !text-white",
        disabled: isCreatingVessel || isUpdatingVessel,
      }}
      width={window.innerWidth - 400}
      centered
      onOk={handleSubmit}
      onCancel={handleClose}
    >
      <Spin spinning={!isCreate && isLoadingVesselDetail}>
        <Form
          form={form}
          layout="vertical"
          className="mt-8 grid gap-3 grid-cols-3 grid-rows-3"
        >
          <Form.Item
            label="Code"
            name="vsl_cd"
            rules={[
              { required: true, message: "This field is required!" },
              {
                max: MAXIMUM_VSL_CODE_LENGTH,
                message: `Maximum code length is ${MAXIMUM_VSL_CODE_LENGTH}`,
              },
            ]}
          >
            <Input disabled={!isCreate} className="p-2" />
          </Form.Item>
          <Form.Item
            label="Vessel English Name"
            name="vsl_eng_nm"
            rules={[
              {
                max: MAXIMUM_VSL_NAME_LENGTH,
                message: `Maximum vessel name length is ${MAXIMUM_VSL_NAME_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item
            label="Vessel Local Name"
            name="vsl_locl_nm"
            rules={[
              {
                max: MAXIMUM_VSL_NAME_LENGTH,
                message: `Maximum vessel name length is ${MAXIMUM_VSL_NAME_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Fuel Oil Capacity" name="foil_capa">
            <InputNumber className="p-1 w-full" />
          </Form.Item>
          <Form.Item label="Diesel Oil Capacity" name="doil_capa">
            <InputNumber className="p-1 w-full" />
          </Form.Item>
          <Form.Item label="Fresh Water Capacity" name="frsh_wtr_capa">
            <InputNumber className="p-1 w-full" />
          </Form.Item>
          <Form.Item
            label="Registration Number"
            name="rgst_no"
            rules={[
              {
                max: MAXIMUM_REGISTRATION_NUMBER_LENGTH,
                message: `Maximum registration number length is ${MAXIMUM_REGISTRATION_NUMBER_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phn_no"
            rules={[
              {
                max: MAXIMUM_PHONE_NUMBER_LENGTH,
                message: `Maximum phone number length is ${MAXIMUM_PHONE_NUMBER_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item
            label="Fax Number"
            name="fax_no"
            rules={[
              {
                max: MAXIMUM_FAX_NUMBER_LENGTH,
                message: `Maximum fax number length is ${MAXIMUM_FAX_NUMBER_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item
            label="Telex Number"
            name="tlx_no"
            rules={[
              {
                max: MAXIMUM_TELEX_NUMBER_LENGTH,
                message: `Maximum telex number length is ${MAXIMUM_TELEX_NUMBER_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item
            label="Vessel Email"
            name="vsl_eml"
            rules={[
              {
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Invalid email!",
                validateTrigger: "onSubmit",
              },
              {
                max: MAXIMUM_EMAIL_LENGTH,
                message: `Maximum email length is ${MAXIMUM_EMAIL_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item
            label="P&I Club Description"
            name="piclb_desc"
            rules={[
              {
                max: MAXIMUM_PI_CLUB_DESCRIPTION_LENGTH,
                message: `Maximum P&I club description length is ${MAXIMUM_PI_CLUB_DESCRIPTION_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item
            label="Registration Port Code"
            name="rgst_port_cd"
            rules={[
              {
                max: MAXIMUM_REGISTRATION_PORT_CODE_LENGTH,
                message: `Maximum registration port code length is ${MAXIMUM_REGISTRATION_PORT_CODE_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item
            label="Class Number Register Area Name"
            name="clss_no_rgst_area_nm"
            rules={[
              {
                max: MAXIMUM_CLASS_NUMBER_REGISTER_AREA_NAME_LENGTH,
                message: `Maximum class number register area name length is ${MAXIMUM_CLASS_NUMBER_REGISTER_AREA_NAME_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item
            label="Vessel Class Number"
            name="vsl_clss_no"
            rules={[
              {
                max: MAXIMUM_VESSEL_CLASS_NUMBER_LENGTH,
                message: `Maximum vessel class number length is ${MAXIMUM_VESSEL_CLASS_NUMBER_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item
            label="Vessel Builder Name"
            name="vsl_bldr_nm"
            rules={[
              {
                max: MAXIMUM_VESSEL_BUILDER_NAME_LENGTH,
                message: `Maximum vessel builder name length is ${MAXIMUM_VESSEL_BUILDER_NAME_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="LOA Length" name="loa_len">
            <InputNumber className="p-1 w-full" />
          </Form.Item>
          <Form.Item label="LBP Length" name="lbp_len">
            <InputNumber className="p-1 w-full" />
          </Form.Item>
          <Form.Item
            label="Carrier Code"
            name="crr_cd"
            rules={[
              {
                max: MAXIMUM_CARRIER_CODE_LENGTH,
                message: `Maximum carrier code length is ${MAXIMUM_CARRIER_CODE_LENGTH}`,
              },
            ]}
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Net Ton" name="pnm_net_tong_wgt">
            <InputNumber className="p-1 w-full" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateUpdateVesselModal;
