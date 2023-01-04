import Button from "@/components/Button"
import { useContext } from "@/components/ContextProvider"
import { TrashIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"

const TodoList = () => {
  const router = useRouter()
  const { idList } = router.query
  const { todoList, deleteTodo, handleCheckboxChange } = useContext()

  const id = Number.parseInt(idList, 10)
  const todoListSelected = todoList.find((item) => item.id === id)

  const handleClickDelete = useCallback(
    (e) => {
      const taskId = Number.parseInt(
        e.currentTarget.getAttribute("data-task-id"),
        10
      )

      deleteTodo(taskId)
    },
    [deleteTodo]
  )

  const handleClickCheckboxChange = useCallback(
    (e) => {
      const taskId = Number.parseInt(
        e.currentTarget.getAttribute("data-task-id"),
        10
      )

      handleCheckboxChange(taskId)
    },
    [handleCheckboxChange]
  )

  return (
    <>
      {todoListSelected ? (
        <>
          {todoListSelected.task.length > 0 ? (
            <>
              {todoListSelected.task.map((taskItem) => (
                <p key={taskItem.id} className="flex pl-4 border-b-2">
                  <input
                    readOnly
                    type="checkbox"
                    data-task-id={taskItem.id}
                    checked={taskItem.checked}
                    onClick={handleClickCheckboxChange}
                    className="w-5 accent-green-400 cursor-pointer"
                  />
                  <Link
                    href={`/tasks/${taskItem.id}/edit?idList=${id}`}
                    className="p-2"
                  >
                    {taskItem.id} / {taskItem.description}
                  </Link>
                  <Button
                    data-task-id={taskItem.id}
                    onClick={handleClickDelete}
                    className="ml-auto"
                  >
                    <TrashIcon className="w-5 " />
                  </Button>
                </p>
              ))}
            </>
          ) : (
            <span className="flex text-2xl font-bold">
              Add new task or new list !
            </span>
          )}
        </>
      ) : null}
    </>
  )
}

export default TodoList
