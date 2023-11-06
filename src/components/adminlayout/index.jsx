import React, { Fragment, useEffect, useRef, useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { GiStrong } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IoNotificationsSharp } from "react-icons/io5";
import {
  useGetNonClientUsersQuery,
  useGetUserMutation,
  useUpdateUserMutation,
} from "../../redux/queries/users";
import styles from "./AdminLayout.module.scss";
import NotificationCard from "../notificationCard";
import { toast } from "react-toastify";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const LIMIT = 10;

  const [limit, setLimit] = useState(10);
  const [collapsed, setCollapsed] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const [changeLoading, setChangeLoading] = useState(false);

  const {
    data: { users, total } = { users: [], total: 0 },
    refetch,
    isFetching,
    error,
  } = useGetNonClientUsersQuery({ page: 1, limit, role: "user" });
  const [getUser] = useGetUserMutation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const changeRole = async (id) => {
    const { data } = await getUser(id);
    await updateUser(id).unwrap();
    refetch();
  };

  const scrollPagination = (e) => {
    if (users.length !== total) {
      if (
        e.currentTarget.clientHeight + e.currentTarget.scrollTop + 1 >=
        e.currentTarget.scrollHeight
      ) {
        setLimit(limit + LIMIT);
        refetch();
      }
    }
  };

  return (
    <Fragment>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <img   className="demo-logo-vertical"
            style={{
              height: "33px",
              paddingLeft: "20px",
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: "3px",
            }} src="https://exam-part1.vercel.app/assets/Screenshot_28-removebg-preview-f80103b9.png" alt="" />
          
          
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={location.pathname}
            items={[
              {
                key: "/admin/dashboard",
                icon: <GiStrong />,
                label: <Link to="/admin/dashboard">Dashboard</Link>,
              },
              {
                key: "/admin/experiences",
                icon: <GiStrong />,
                label: <Link to="/admin/experiences">Experiences</Link>,
              },
              {
                key: "/admin/users",
                icon: <FiUsers />,
                label: <Link to="/admin/users">Users</Link>,
              },
              {
                key: "/admin/education",
                icon: <FaUniversity />,
                label: <Link to="/admin/education">Education</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              width: collapsed ? "100%" : "calc(100% - 200px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 0,
              paddingRight: "25px",
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              marginTop: "90px",
              padding: 24,
              minHeight: 280,
              overflowY: "auto",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default AdminLayout;
