import Button from "@/components/Button"
import {
  CheckCircleIcon,
  CheckIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { useContext } from "@/components/ContextProvider"

const NavBar = () => {
  const router = useRouter()
  const { listId } = router.query
  const { todoList, deleteTodoList, filterTask, toggle } = useContext()

  const selectedTodoListId = Number.parseInt(listId, 10)
  const selectedTodoList = todoList.find(
    (item) => item.id === selectedTodoListId
  )

  let completedTasksLenght
  let completedTasks

  if (selectedTodoList && selectedTodoList.task) {
    completedTasks = selectedTodoList.task.filter(
      (task) => task.checked === true
    )
    completedTasksLenght = completedTasks.length
  }

  const handleClickDeleteList = useCallback(
    (e) => {
      const listId = Number.parseInt(
        e.currentTarget.getAttribute("data-task-list-id"),
        10
      )
      deleteTodoList(listId)
      router.push("/")
    },
    [deleteTodoList, router]
  )

  const handleClickScroll = useCallback((e) => {
    const element = e.currentTarget
    element.scrollIntoView()
  }, [])

  const handleClickFilterTask = useCallback(() => {
    filterTask()
  }, [filterTask])

  return (
    <>
      <div className="sticky top-0 left-0 overflow-x-auto bg-white">
        <div className="flex">
          {todoList.map((taskList) => (
            <div key={taskList.id}>
              <ul className="flex gap pt-1">
                <Link
                  href={`/?listId=${taskList.id}`}
                  className={`${
                    taskList.id === selectedTodoListId
                      ? "p-2 border-t border-r rounded-t-lg font-bold cursor-pointer bg-slate-300"
                      : "p-2 border-t border-r rounded-t-lg font-bold cursor-pointer"
                  }`}
                  onClick={(e) => handleClickScroll(e)}
                >
                  <span className="p-2">{taskList.name}</span>
                  {completedTasksLenght === 0 ? (
                    <span className="pl-2 pr-2 bg-blue-400 text-sm rounded-lg">
                      {taskList.task.length}
                    </span>
                  ) : (
                    <>
                      {taskList.id === selectedTodoListId ? (
                        <span className="pl-2 pr-2 bg-green-400 text-sm rounded-lg z-40 relative">
                          {completedTasksLenght}
                        </span>
                      ) : null}
                      <span className="pl-2 pr-2 bg-blue-400 text-sm rounded-lg z-10 relative">
                        {taskList.task.length}
                      </span>
                    </>
                  )}
                </Link>
              </ul>

              {taskList.task.length === 0 ? null : (
                <div className="bg-slate-300 rounded-2xl">
                  <div
                    className={`${
                      taskList.id === selectedTodoListId
                        ? "bg-green-400 pt-1 rounded-2xl duration-300 ease-linear"
                        : ""
                    }`}
                    style={{
                      width: `${
                        (completedTasksLenght / taskList.task.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          ))}

          {todoList.length > 0 ? (
            <div className="flex flex-col">
              <div className="flex gap pt-1">
                <Link
                  href={"/lists/create"}
                  className="p-2 border-t border-r border-l rounded-t-lg ml-3"
                >
                  <PlusIcon className="w-6" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex gap pt-1">
                <Link
                  href={"/lists/create"}
                  className="p-2 border-t border-r border-l rounded-t-lg ml-3"
                >
                  <PlusIcon className="w-8" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedTodoList ? (
        <div className="flex sticky top-12 border-2 bg-white">
          <Link
            href={`/tasks/create?listId=${selectedTodoListId}`}
            className="px-2 py-1 text-sm"
          >
            <PlusIcon className="w-6" />
          </Link>
          <Link
            href={`/lists/${selectedTodoListId}/edit`}
            className="px-2 py-1 text-sm"
          >
            <PencilSquareIcon className="w-6" />
          </Link>
          <Button data-task-list-id={listId} onClick={handleClickDeleteList}>
            <TrashIcon className="w-6" />
          </Button>
          <Button onClick={handleClickFilterTask} className="w-10 ml-auto">
            {!toggle ? <CheckCircleIcon /> : <CheckIcon />}
          </Button>
        </div>
      ) : null}
    </>
  )
}

export default NavBar
