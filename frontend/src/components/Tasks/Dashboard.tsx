import { Badge, Heading, Table, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import API from "../../config/api";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import ProtectedRoute from "./../../config/ProtectedRoute";

const Dashboard = () => {
  type Task = [
    {
      title: string;
      completed: boolean;
      description: string;
      _id: string;
    }
  ];

  const [refreshList, setrefreshList] = useState(false);
  const [tasks, setTasks] = useState<Task>([
    {
      title: "",
      completed: false,
      description: "",
      _id: "",
    },
  ]);

  async function fetchTasks() {
    try {
      const response = await API.get("/task");
      setTasks(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchTasks();

    setrefreshList(false);
  }, [refreshList]);

  return (
    <>
      <ProtectedRoute>
        <div className="max-w-[80%] mx-auto text-center">
          <div className="pt-16">
            <div>
              <Heading>Dashboard</Heading>
            </div>
            <div>
              <Text>View and manage all your tasks here</Text>
            </div>
            <div className="max-h-[60vh] overflow-auto mt-5">
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {tasks.map((task) => (
                    <Table.Row key={task._id}>
                      <Table.RowHeaderCell>{task.title}</Table.RowHeaderCell>
                      <Table.Cell>{task.description}</Table.Cell>
                      <Table.Cell>
                        <Badge
                          size={"2"}
                          color={task.completed ? "green" : "orange"}
                          variant="outline"
                        >
                          {task.completed ? "Complete" : "Incomplete"}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <EditTask
                          title={task.title}
                          description={task.description}
                          completed={task.completed}
                          _id={task._id}
                          setrefreshList={setrefreshList}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <DeleteTask
                          id={task._id}
                          setRefreshList={setrefreshList}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </div>
            <div className="mt-7">
              <AddTask setRefreshList={setrefreshList} />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Dashboard;
