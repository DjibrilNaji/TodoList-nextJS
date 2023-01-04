import Button from "@/components/Button"
import { useContext } from "@/components/ContextProvider"
import {
  CheckIcon,
  ChevronDoubleUpIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"

const NavBar = () => {
  const router = useRouter()
  const { idList } = router.query
  const { todoList, deleteTodoList } = useContext()

  const id = Number.parseInt(idList, 10)

  function countCheckedTasks(tasks) {
    return tasks.reduce((total, task) => total + (task.checked ? 1 : 0), 0)
  }

  const checkedTasks = todoList.reduce(
    (total, taskList) => total + countCheckedTasks(taskList.task),
    0
  )
  const handleClickDeleteList = useCallback(
    (e) => {
      const listId = Number.parseInt(
        e.currentTarget.getAttribute("data-task-list-id"),
        10
      )
      deleteTodoList(listId)
      router.push("/?idList=1")
    },
    [deleteTodoList, router]
  )

  return (
    <>
      <div className="sticky top-0 bg-white">
        <div className="flex">
          {todoList.map((taskList) => (
            <div key={taskList.id}>
              <ul className="flex gap pt-1">
                <Link
                  href={`/?idList=${taskList.id}`}
                  className="p-2 border-t border-r rounded-t-lg font-bold cursor-pointer"
                >
                  <span className="p-2">
                    {taskList.id} / {taskList.name}
                  </span>
                  {taskList.task.length === 0 ? (
                    <span className="p-2 pt-0 pb-0 bg-blue-400 text-sm rounded-lg">
                      {taskList.task.length}
                    </span>
                  ) : (
                    <>
                      <span className="pr-2 pl-2 pt-0 pb-0 bg-green-400 text-sm rounded-lg">
                        {checkedTasks}
                      </span>
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
                      width: `${(checkedTasks / taskList.task.length) * 100}%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          ))}

          <div className="flex gap pt-1">
            <Link
              href={"/lists/create"}
              className="p-2 border-t border-r border-l rounded-t-lg ml-3"
            >
              <PlusIcon className="w-6" />
            </Link>
          </div>
        </div>
      </div>

      {todoList.length > 0 ? (
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

          <div className="ml-auto">
            <Button>
              <CheckCircleIcon className="w-6" />
            </Button>
            <Button>
              <CheckIcon className="w-6" />
            </Button>
          </div>
        </div>
      ) : (
        <span className="flex p-4 text-2xl font-bold">
          <ChevronDoubleUpIcon className="w-7" />
          Add new todolist here !
        </span>
      )}
    </>
  )
}

export default NavBar
