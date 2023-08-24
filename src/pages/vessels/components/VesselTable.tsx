import { Dispatch, SetStateAction } from "react";
import { Popconfirm, Space, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import moment from "moment";

import Vessel from "@/models/Vessel";
import { useDeleteVessel } from "@/hooks/vessels";

interface VesselTableProps {
  data: Vessel[];
  isLoading: boolean;
  pagination: TablePaginationConfig;
  canUpdate: boolean;
  canDelete: boolean;
  onSetPagination: Dispatch<SetStateAction<TablePaginationConfig>>;
  onEditButtonClick: (userId: string) => void;
}

const VesselTable = ({
  data,
  isLoading,
  pagination,
  canUpdate,
  canDelete,
  onSetPagination,
  onEditButtonClick,
}: VesselTableProps) => {
  const { deleteVessel } = useDeleteVessel({});

  const columns: ColumnsType<Vessel> = [
    {
      title: "Code",
      dataIndex: "vsl_cd",
      key: "vsl_cd",
    },
    {
      title: "Vessel English Name",
      dataIndex: "vsl_eng_nm",
      key: "vsl_eng_nm",
    },
    {
      title: "Vessel Local Name",
      dataIndex: "vsl_locl_nm",
      key: "vsl_locl_nm",
    },
    {
      title: "Fuel Oil Capacity",
      dataIndex: "foil_capa",
      key: "foil_capa",
    },
    {
      title: "Diesel Oil Capacity",
      dataIndex: "doil_capa",
      key: "doil_capa",
    },
    {
      title: "Fresh Water Capacity",
      key: "frsh_wtr_capa",
      dataIndex: "frsh_wtr_capa",
    },
    {
      title: "Registration Number",
      key: "rgst_no",
      dataIndex: "rgst_no",
    },
    {
      title: "Phone Number",
      key: "phn_no",
      dataIndex: "phn_no",
    },
    {
      title: "Fax Number",
      key: "fax_no",
      dataIndex: "fax_no",
    },
    {
      title: "Telex Number",
      key: "tlx_no",
      dataIndex: "tlx_no",
    },
    {
      title: "Vessel Email",
      key: "vsl_eml",
      dataIndex: "vsl_eml",
    },
    {
      title: "P&I Club Description",
      key: "piclb_desc",
      dataIndex: "piclb_desc",
    },
    {
      title: "Registration Port Code",
      key: "rgst_port_cd",
      dataIndex: "rgst_port_cd",
    },
    {
      title: "Class Number Register Area Name",
      key: "clss_no_rgst_area_nm",
      dataIndex: "clss_no_rgst_area_nm",
    },
    {
      title: "Vessel Class Number",
      key: "vsl_clss_no",
      dataIndex: "vsl_clss_no",
    },
    {
      title: "Vessel Builder Name",
      key: "vsl_bldr_nm",
      dataIndex: "vsl_bldr_nm",
    },
    {
      title: "LOA Length",
      key: "loa_len",
      dataIndex: "loa_len",
    },
    {
      title: "LBP Length",
      key: "lbp_len",
      dataIndex: "lbp_len",
    },
    {
      title: "Carrier Code",
      dataIndex: "crr_cd",
      key: "crr_cd",
    },
    {
      title: "Net Ton",
      key: "pnm_net_tong_wgt",
      dataIndex: "pnm_net_tong_wgt",
    },
    {
      title: "Created At",
      key: "cre_dt",
      dataIndex: "cre_dt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Last Updated At",
      key: "upd_dt",
      dataIndex: "upd_dt",
      render: (updatedAt) => moment(updatedAt).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      fixed: "right",
      align: "center",
      render: (id) => (
        <Space>
          {canUpdate ? (
            <EditOutlined
              className="hover:text-primary mr-2"
              onClick={() => onEditButtonClick(id)}
            />
          ) : (
            <Tooltip title="You don't have permission to update vessels!">
              <EditOutlined className=" !text-gray-300 cursor-not-allowed mr-2" />
            </Tooltip>
          )}
          {canDelete ? (
            <Popconfirm
              title="Are you sure you want to delete this vessel?"
              onConfirm={() => deleteVessel({ vesselId: id })}
              okText="Yes"
              cancelText="No"
              okType="danger"
            >
              <DeleteOutlined className="hover:text-primary" />
            </Popconfirm>
          ) : (
            <Tooltip title="You don't have permission to delete vessels!">
              <DeleteOutlined className="!text-gray-300 cursor-not-allowed" />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table<Vessel>
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={onSetPagination}
        loading={isLoading}
        rowKey={(vessel) => vessel.id}
        bordered
        scroll={{ x: "400rem" }}
      />
    </>
  );
};

export default VesselTable;
