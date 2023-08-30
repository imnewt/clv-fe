import { Col, Descriptions, Row, Typography } from "antd";

import Vessel from "@/models/Vessel";
import moment from "moment";

export interface VesselDetailProps {
  vessel: Vessel;
}

const VesselDetail = ({ vessel }: VesselDetailProps) => {
  return (
    <div>
      <Typography.Title level={4}>Vessel Detail</Typography.Title>
      <Row>
        <Col xs={24}>
          <Descriptions bordered size="small">
            <Descriptions.Item label="Code" span={3}>
              {vessel.vsl_cd}
            </Descriptions.Item>
            <Descriptions.Item label="Vessel English Name" span={1}>
              {vessel.vsl_eng_nm}
            </Descriptions.Item>
            <Descriptions.Item label="Vessel Local Name" span={1}>
              {vessel.vsl_locl_nm}
            </Descriptions.Item>
            <Descriptions.Item label="Fuel Oil Capacity" span={1}>
              {vessel.foil_capa}
            </Descriptions.Item>
            <Descriptions.Item label="Diesel Oil Capacity" span={1}>
              {vessel.doil_capa}
            </Descriptions.Item>
            <Descriptions.Item label="Fresh Water Capacity" span={1}>
              {vessel.frsh_wtr_capa}
            </Descriptions.Item>
            <Descriptions.Item label="Registration Number" span={1}>
              {vessel.rgst_no}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number" span={1}>
              {vessel.phn_no}
            </Descriptions.Item>
            <Descriptions.Item label="Fax Number" span={1}>
              {vessel.fax_no}
            </Descriptions.Item>
            <Descriptions.Item label="Telex Number" span={1}>
              {vessel.tlx_no}
            </Descriptions.Item>
            <Descriptions.Item label="Vessel Email" span={1}>
              {vessel.vsl_eml}
            </Descriptions.Item>
            <Descriptions.Item label="P&I Club Description" span={1}>
              {vessel.piclb_desc}
            </Descriptions.Item>
            <Descriptions.Item label="Registration Port Code" span={1}>
              {vessel.rgst_port_cd}
            </Descriptions.Item>
            <Descriptions.Item label="Class Number Register Area Name" span={1}>
              {vessel.clss_no_rgst_area_nm}
            </Descriptions.Item>
            <Descriptions.Item label="Vessel Class Number" span={1}>
              {vessel.vsl_clss_no}
            </Descriptions.Item>
            <Descriptions.Item label="Vessel Builder Name" span={1}>
              {vessel.vsl_bldr_nm}
            </Descriptions.Item>
            <Descriptions.Item label="LOA Length" span={1}>
              {vessel.loa_len}
            </Descriptions.Item>
            <Descriptions.Item label="LBP Length" span={1}>
              {vessel.lbp_len}
            </Descriptions.Item>
            <Descriptions.Item label="Carrier Code" span={1}>
              {vessel.crr_cd}
            </Descriptions.Item>
            <Descriptions.Item label="Net Ton" span={1}>
              {vessel.pnm_net_tong_wgt}
            </Descriptions.Item>
            <Descriptions.Item label="Created At" span={1}>
              {moment(vessel.cre_dt).format("YYYY-MM-DD HH:mm")}
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated At" span={1}>
              {moment(vessel.upd_dt).format("YYYY-MM-DD HH:mm")}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </div>
  );
};

export default VesselDetail;
