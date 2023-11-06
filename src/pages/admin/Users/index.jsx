import { useState } from "react";
import { useDeleteUsersMutation, useGetUsersQuery } from "../../../redux/queries/users";
import { Button, Input, Pagination, Space, Table } from "antd";
import { CgAddR } from "react-icons/cg";
import { LIMIT } from "../../../constants/constants";
import Link from "antd/es/typography/Link";

import styles from './AdminUsersPage.module.scss'

const AdminUsersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const {
    data: { users, total } = { users: [], total: 0 },
    refetch,
    isFetching,
  } = useGetUsersQuery({ page, limit: LIMIT, search });
  const [deleteUsers] = useDeleteUsersMutation()
console.log(users)
  const handleDelete = async (id) => {
    await deleteUsers(id)
    refetch();
    setPage(1)
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (username) =>
        username ? username : <p>Unknown</p>,
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber) =>
        phoneNumber ? (
          phoneNumber
        ) : (
          <p>Unknown</p>
        ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) =>
        address ? (
          <p
            style={{
              width: "300px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "1",
              overflow: "hidden",
            }}
          >
            {address}
          </p>
        ) : (
          <p>Unknown</p>
        ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <Space size="middle">
          <Button type="primary" onClick={() => {}}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(_id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className={styles.users_wrapper}>
        <h1>Users ({total})</h1>
      <div className={styles.users_wrapper_header}>
        <Input onChange={(e) => {
          setSearch(e.target.value)
          refetch();
          setPage(1)
        }} type="text" placeholder="Search" name="" id="" />
        <button>❌</button>
      </div>
      <Table
        loading={isFetching}
        pagination={false}
        scroll={{
          x: 1000,
        }}
        dataSource={users}
        columns={columns}
      />
      <Pagination
        pageSize={LIMIT}
        current={page}
        total={total}
        onChange={(e) => {
          console.log(e);
          setPage(e);
          refetch();
        }}
      />
    </div>
  );
};

export default AdminUsersPage;
