import {
  Box,
  Button,
  Dialog,
  Flex,
  RadioCards,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Dispatch, SetStateAction, useState } from "react";
import API from "../../config/api";

type EditTaskProps = {
  title: string;
  description: string;
  completed: boolean;
  _id: string;
  setrefreshList: Dispatch<SetStateAction<boolean>>;
};

const EditTask = ({
  title,
  description,
  completed,
  _id,
  setrefreshList,
}: EditTaskProps) => {
  const [message, setMessage] = useState("");
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: title,
    description: description,
    completed: completed,
    _id: _id,
  });

  function handleTaskDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditedTask({
      ...editedTask,
      [e.target.name.toLowerCase()]: e.target.value,
    });
  }

  function handleCompletionChange(value: string) {
    setEditedTask({
      ...editedTask,
      completed: value === "1",
    });
  }

  async function handleEditedTaskSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsEditingTask(true);
      const { title, description, completed } = editedTask;
      await API.put(`/task/${editedTask._id}`, {
        title,
        description,
        completed,
      });
      setMessage("Task modified successfully");
      setrefreshList(true);
    } catch (e) {
      console.error(e);
      setMessage("Task couldn't be modified");
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
    setIsEditingTask(false);
  }

  return (
    <>
      <div>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button size={"1"} variant="soft" color="green" highContrast>
              Edit Task
            </Button>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="450px">
            <form onSubmit={handleEditedTaskSubmit}>
              <Dialog.Title>Edit Task</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Make changes to your task.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Title
                  </Text>
                  <TextField.Root
                    name="Title"
                    value={editedTask.title}
                    placeholder="Title"
                    onChange={handleTaskDataChange}
                    required
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Description
                  </Text>
                  <TextField.Root
                    name="Description"
                    value={editedTask.description}
                    placeholder="Description of the task"
                    onChange={handleTaskDataChange}
                    required
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Completion Status
                  </Text>
                  <Box maxWidth="600px">
                    <RadioCards.Root
                      defaultValue={editedTask.completed ? "1" : "0"}
                      columns={{ initial: "1", sm: "3" }}
                      name="Completed"
                      onValueChange={handleCompletionChange}
                    >
                      <RadioCards.Item value="1">
                        <Flex direction="column" width="100%">
                          <Text weight="bold">Complete</Text>
                        </Flex>
                      </RadioCards.Item>
                      <RadioCards.Item value="0">
                        <Flex direction="column" width="100%">
                          <Text weight="bold">Incomplete</Text>
                        </Flex>
                      </RadioCards.Item>
                    </RadioCards.Root>
                  </Box>
                </label>
              </Flex>
              <Text>{message}</Text>
              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button type="submit" loading={isEditingTask ? true : false}>
                    Save Task
                  </Button>
                </Dialog.Close>
              </Flex>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </>
  );
};

export default EditTask;
