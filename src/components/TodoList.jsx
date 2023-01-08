import Button from "@/components/Button"
import { useContext } from "@/components/ContextProvider"
import Text from "@/components/Text"
import { ChevronDoubleUpIcon, TrashIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"

const TodoList = () => {
  const router = useRouter()
  const { listId } = router.query
  const { todoList, deleteTodo, toggleCheckedTask, toggle } = useContext()

  const todoListSelectedId = Number.parseInt(listId, 10)
  const todoListSelected = todoList.find(
    (item) => item.id === todoListSelectedId
  )

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

  const handleClickCompleteTask = useCallback(
    (e) => {
      const taskId = Number.parseInt(
        e.currentTarget.getAttribute("data-task-id"),
        10
      )

      toggleCheckedTask(taskId)
    },
    [toggleCheckedTask]
  )

  let filteredTasks

  if (todoListSelected && todoListSelected.task) {
    filteredTasks = todoListSelected.task.filter(
      (task) => task.checked === false
    )
  }

  return (
    <>
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
                      className="flex items-center pl-2 pb-2 pt-2 border-b-2"
                    >
                      <input
                        readOnly
                        type="checkbox"
                        data-task-id={taskItem.id}
                        checked={taskItem.checked}
                        onClick={handleClickCompleteTask}
                        className="h-5 w-5 border-2 appearance-none checked:bg-green-400"
                      />

                      <Link
                        href={`/tasks/${taskItem.id}/edit?listId=${todoListSelectedId}`}
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
                      className="flex items-center pl-2 pb-2 pt-2 border-b-2"
                    >
                      <input
                        readOnly
                        type="checkbox"
                        data-task-id={taskItem.id}
                        checked={taskItem.checked}
                        onClick={handleClickCompleteTask}
                        className="h-5 w-5 border-2 appearance-none"
                      />

                      <Link
                        href={`/tasks/${taskItem.id}/edit?listId=${todoListSelectedId}`}
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
              )}
            </>
          ) : (
            <Text title="Add new task or new list !" />
          )}
        </>
      ) : (
        <div className="flex p-4">
          <ChevronDoubleUpIcon className="w-9" />
          <Text title="Select a list or create one !" />
        </div>
      )}
    </>
  )
}

export default TodoList
