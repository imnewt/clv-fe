import { useEffect, useCallback, useMemo } from "react";
import { Modal, Form, Input, Spin } from "antd";
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
            rules={[{ required: true, message: "This field is required!" }]}
          >
            <Input disabled={!isCreate} className="p-2" />
          </Form.Item>
          <Form.Item label="Vessel English Name" name="vsl_eng_nm">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Vessel Local Name" name="vsl_locl_nm">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Fuel Oil Capacity" name="foil_capa">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Diesel Oil Capacity" name="doil_capa">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Fresh Water Capacity" name="frsh_wtr_capa">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Registration Number" name="rgst_no">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Phone Number" name="phn_no">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Fax Number" name="fax_no">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Telex Number" name="tlx_no">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Vessel Email" name="vsl_eml">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="P&I Club Description" name="piclb_desc">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Registration Port Code" name="rgst_port_cd">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item
            label="Class Number Register Area Name"
            name="clss_no_rgst_area_nm"
          >
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Vessel Class Number" name="vsl_clss_no">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Vessel Builder Name" name="vsl_bldr_nm">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="LOA Length" name="loa_len">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="LBP Length" name="lbp_len">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Carrier Code" name="crr_cd">
            <Input className="p-2" />
          </Form.Item>
          <Form.Item label="Net Ton" name="pnm_net_tong_wgt">
            <Input className="p-2" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateUpdateVesselModal;
