import Button from "@/components/Button"
import { useContext } from "@/components/ContextProvider"
import Text from "@/components/Text"
import {
  CheckCircleIcon,
  CheckIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

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

  let filteredTasks

  if (todoListSelected && todoListSelected.task) {
    filteredTasks = todoListSelected.task.filter(
      (task) => task.checked === false
    )
  }

  const [toggle, setToggle] = useState(false)

  const handleShowCompletedClick = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <Button onClick={handleShowCompletedClick} className="w-12">
        {!toggle ? <CheckCircleIcon /> : <CheckIcon />}
      </Button>

      {todoListSelected ? (
        <>
          {todoListSelected.task.length > 0 ? (
            <>
              {!toggle ? (
                <>
                  {todoListSelected.task.map((taskItem) => (
                    <div
                      key={taskItem.id}
                      data-task-id={taskItem.id}
                      className="flex pl-2 pb-2 pt-2 border-b-2"
                    >
                      <input
                        readOnly
                        type="checkbox"
                        data-task-id={taskItem.id}
                        checked={taskItem.checked}
                        onClick={handleClickCheckboxChange}
                        className="p-4 border-2 appearance-none checked:bg-green-400"
                      />

                      <Link
                        href={`/tasks/${taskItem.id}/edit?idList=${id}`}
                        className="p-2"
                      >
                        {taskItem.description}
                      </Link>
                      <Button
                        data-task-id={taskItem.id}
                        onClick={handleClickDelete}
                        className="ml-auto"
                      >
                        <TrashIcon className="w-6" />
                      </Button>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {filteredTasks.map((taskItem) => (
                    <div
                      key={taskItem.id}
                      className="flex pl-2 pb-2 pt-2 border-b-2"
                    >
                      <input
                        readOnly
                        type="checkbox"
                        data-task-id={taskItem.id}
                        checked={taskItem.checked}
                        onClick={handleClickCheckboxChange}
                        className="p-4 border-2 appearance-none checked:bg-green-400"
                      />

                      <Link
                        href={`/tasks/${taskItem.id}/edit?idList=${id}`}
                        className="p-2"
                      >
                        {taskItem.description}
                      </Link>
                      <Button
                        data-task-id={taskItem.id}
                        onClick={handleClickDelete}
                        className="ml-auto"
                      >
                        <TrashIcon className="w-5" />
                      </Button>
                    </div>
                  ))}
                </>
              )}
            </>
          ) : (
            <Text title="Add new task or new list !" />
          )}
        </>
      ) : null}
    </>
  )
}

export default TodoList
