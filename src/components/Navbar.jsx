import Button from "@/components/Button"
import { useContext } from "@/components/ContextProvider"
import Text from "@/components/Text"
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

const NavBar = () => {
  const router = useRouter()
  const { idList } = router.query
  const { todoList, deleteTodoList, handleShowCompletedClick, showCompleted } =
    useContext()

  console.log(showCompleted)

  const id = Number.parseInt(idList, 10)
  const todoListSelected = todoList.find((item) => item.id === id)

  let completedTasksLenght
  let completedTasks

  if (todoListSelected && todoListSelected.task) {
    completedTasks = todoListSelected.task.filter(
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

  const handleCheckboxChange = useCallback(() => {
    handleShowCompletedClick()
    console.log(showCompleted)
  }, [handleShowCompletedClick, showCompleted])

  return (
    <>
      <div className="sticky top-0 bg-white">
        <div className="flex">
          {todoList.map((taskList) => (
            <div key={taskList.id}>
              <ul className="flex gap pt-1">
                <Link
                  href={`/?idList=${taskList.id}`}
                  className={`${
                    taskList.id === id
                      ? "p-2 border-t border-r rounded-t-lg font-bold cursor-pointer bg-slate-300"
                      : "p-2 border-t border-r rounded-t-lg font-bold cursor-pointer"
                  }`}
                >
                  <span className="p-2">{taskList.name}</span>
                  {taskList.task.length === 0 ? (
                    <span className="p-2 pt-0 pb-0 bg-blue-400 text-sm rounded-lg">
                      {taskList.task.length}
                    </span>
                  ) : (
                    <>
                      {taskList.id === id ? (
                        <>
                          <span className="pr-2 pl-2 pt-0 pb-0 bg-green-400 text-sm rounded-lg">
                            {completedTasksLenght}
                          </span>
                        </>
                      ) : null}
                      <span className="p-2 pt-0 pb-0 bg-blue-400 text-sm rounded-lg">
                        {taskList.task.length}
                      </span>
                    </>
                  )}
                </Link>
              </ul>
              {taskList.task.length === 0 ? (
                <div className="bg-slate-300">
                  <div className="opacity-0"></div>
                </div>
              ) : (
                <div className="bg-slate-300 rounded-2xl">
                  <div
                    className={`${
                      taskList.id === id
                        ? "bg-green-400 pt-1 rounded-2xl duration-500 ease-linear"
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
            <>
              <div className="flex flex-col">
                <div className="flex gap pt-1">
                  <Link
                    href={"/lists/create"}
                    className="p-2 border-t border-r border-l rounded-t-lg ml-3"
                  >
                    <PlusIcon className="w-8" />
                  </Link>
                </div>
                <>
                  <Text title="Add new list !" />
                </>
              </div>
            </>
          )}
        </div>
      </div>

      {todoListSelected ? (
        <>
          <div className="flex border-2">
            <Link
              href={`/tasks/create?idList=${id}`}
              className="px-2 py-1 text-sm"
            >
              <PlusIcon className="w-6" />
            </Link>
            <Link href={`/lists/${id}/edit`} className="px-2 py-1 text-sm">
              <PencilSquareIcon className="w-6" />
            </Link>
            <Button data-task-list-id={idList} onClick={handleClickDeleteList}>
              <TrashIcon className="w-6" />
            </Button>

            <Button onClick={handleCheckboxChange} className="w-10">
              {!showCompleted ? <CheckCircleIcon /> : <CheckIcon />}
            </Button>
          </div>
        </>
      ) : null}
    </>
  )
}

export default NavBar
