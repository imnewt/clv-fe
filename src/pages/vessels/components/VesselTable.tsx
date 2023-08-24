import { Dispatch, SetStateAction } from "react";
import { Popconfirm, Space, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";

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
      title: "VSL Name",
      dataIndex: "vsl_eng_nm",
      key: "vsl_eng_nm",
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
      title: "Call Sign",
      key: "call_sgn_no",
      dataIndex: "call_sgn_no",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "vsl_cd",
      render: (code) => (
        <Space>
          {canUpdate ? (
            <EditOutlined
              className="hover:text-primary mr-2"
              onClick={() => onEditButtonClick(code)}
            />
          ) : (
            <Tooltip title="You don't have permission to update vessels!">
              <EditOutlined className=" !text-gray-300 cursor-not-allowed mr-2" />
            </Tooltip>
          )}
          {canDelete ? (
            <Popconfirm
              title="Are you sure you want to delete this vessel?"
              onConfirm={() => deleteVessel({ vesselCode: code })}
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
        rowKey={(user) => user.vsl_cd}
      />
    </>
  );
};

export default VesselTable;
