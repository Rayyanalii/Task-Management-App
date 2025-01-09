import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { Dispatch, SetStateAction, useState } from "react";
import API from "../../config/api";

type AddTaskProps = {
  setRefreshList: Dispatch<SetStateAction<boolean>>;
};

const AddTask = ({ setRefreshList }: AddTaskProps) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [message, setMessage] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  function handleTaskDetailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage("");
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  }

  async function handleTaskSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsAddingTask(true);
    try {
      const { title, description } = newTask;
      await API.post("/task", { title, description });
      setMessage("Task added successfully");
      setRefreshList(true);
      setNewTask({
        title: "",
        description: "",
      });
    } catch (e) {
      console.error(e);
      setMessage("Task couldn't be added. Try again");
    }
    setIsAddingTask(false);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="blue" size={"3"}>
            Add New Task
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <form onSubmit={handleTaskSubmit}>
            <Dialog.Title>Add New Task</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Fill in the details.
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Title
                </Text>
                <TextField.Root
                  placeholder="Enter Task Title"
                  name="title"
                  value={newTask.title}
                  onChange={handleTaskDetailChange}
                  required
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Description
                </Text>
                <TextField.Root
                  placeholder="Enter Task Description"
                  name="description"
                  value={newTask.description}
                  onChange={handleTaskDetailChange}
                  required
                />
              </label>
              <Text>{message}</Text>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" loading={isAddingTask ? true : false}>
                Add Task
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default AddTask;
