import { Dispatch, SetStateAction } from "react";
import { Popconfirm, Space, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import moment from "moment";

import Vessel from "@/models/Vessel";
import { useDeleteVessel } from "@/hooks/vessels";
import VesselDetail from "./VesselDetail";

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
      title: "Registration Number",
      key: "rgst_no",
      dataIndex: "rgst_no",
    },
    {
      title: "Vessel Class Number",
      key: "vsl_clss_no",
      dataIndex: "vsl_clss_no",
    },
    {
      title: "Carrier Code",
      dataIndex: "crr_cd",
      key: "crr_cd",
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
        expandable={{
          expandedRowRender: (vessel: Vessel) => (
            <VesselDetail vessel={vessel} />
          ),
        }}
        rowKey={(vessel) => vessel.id}
        bordered
        // scroll={{ x: "40rem" }}
      />
    </>
  );
};

export default VesselTable;
