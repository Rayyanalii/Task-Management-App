import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { Dispatch, SetStateAction, useState } from "react";
import API from "../../config/api";

type DeleteTaskProps = {
  id: string;
  setRefreshList: Dispatch<SetStateAction<boolean>>;
};

const DeleteTask = ({ id, setRefreshList }: DeleteTaskProps) => {
  const [isDeleting, setisDeleting] = useState(false);

  async function handleDeleteTask() {
    if (!isDeleting) {
      setisDeleting(true);

      try {
        await API.delete(`/task/${id}`);
      } catch (e) {
        console.error(e);
        alert("Task couldn't be deleted. Please try again later");
      }
      setisDeleting(false);
      setRefreshList(true);
    }
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button size={"1"} color="red" variant="soft">
            Delete Task
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete Task</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This deleted task will not be recoverable.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={handleDeleteTask}>
                Delete Task
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteTask;
