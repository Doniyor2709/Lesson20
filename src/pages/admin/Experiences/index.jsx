import { useState } from "react";
import {
  useCreateExperiencesMutation,
  useDeleteExperiencesMutation,
  useEditExperiencesMutation,
  useGetExperienceMutation,
  useGetExperiencesQuery,
} from "../../../redux/queries/experiences";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Pagination,
  Space,
  Table,
} from "antd";
import { CgAddR } from "react-icons/cg";
import { LIMIT } from "../../../constants/constants";

import styles from "./AdminExperiencesPage.module.scss";
const { RangePicker } = DatePicker;

const AdminExperiencesPage = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [desc, setDesc] = useState({
    workName: "",
    companyName: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const {
    data: { experiences, total } = { experiences: [], total: 0 },
    refetch,
    isFetching,
  } = useGetExperiencesQuery({ page, limit: LIMIT, search });
  const [deleteExperience] = useDeleteExperiencesMutation();
  const [createExperience] = useCreateExperiencesMutation();
  const [editExperience] = useEditExperiencesMutation();
  const [getExperience] = useGetExperienceMutation();

  const handleDelete = async (id) => {
    await deleteExperience(id).unwrap();
    refetch();
    setPage(1);
  };

  const handleSubmit = async (values) => {
    if (selected === null) {
      await createExperience(desc);
    } else {
      await editExperience(selected, desc);
    }
    refetch();
    setPage(1);
    setModalOpen(false);
    setSelected(null);
  };
  const handleEdit = async (id) => {
    setModalOpen(true);
    setSelected(id);
    const { data } = await getExperience(id);
    form.setFieldsValue(data);
    console.log(data)
  };

  const columns = [
    {
      title: "Employer",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Employee",
      dataIndex: "user",
      key: "user",
      render: (text) => (text ? text.username : "Unknown"),
    },
    {
      title: "Worked as",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "Started at",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => text.slice(0, 10),
    },
    {
      title: "Ended at",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => text.slice(0, 10),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(id)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className={styles.experiences}>
      {modalOpen ? (
        <div className={styles.modal}>
          <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 900 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Work name"
              name="workName"
              rules={[{ required: true, message: "Please input work name!" }]}
            >
              <Input
                onChange={(e) => setDesc({ ...desc, workName: e.target.value })}
              />
            </Form.Item>

            <Form.Item
              label="Company name"
              name="companyName"
              rules={[
                { required: true, message: "Please input company name!" },
              ]}
            >
              <Input
                onChange={(e) =>
                  setDesc({ ...desc, companyName: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input
                onChange={(e) =>
                  setDesc({ ...desc, description: e.target.value })
                }
              />
            </Form.Item>
            <RangePicker
              onChange={(e) =>
                setDesc({ ...desc, startDate: e[0].$d, endDate: e[1].$d })
              }
            />

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : null}
      <h1>Experiences ({total})</h1>
      <div className={styles.experiences_header}>
        <Input
          type="text"
          name=""
          id=""
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
            refetch();
            setPage(1);
          }}
        />
        <button onClick={() => setModalOpen(true)}>
          ADD
        </button>
      </div>
      <Table
        loading={isFetching}
        pagination={false}
        scroll={{
          x: 1000,
        }}
        dataSource={experiences}
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

export default AdminExperiencesPage;
