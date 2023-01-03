import Button from "@/components/Button"
import { useContext } from "@/components/ContextProvider"
import {
  CheckCircleIcon,
  CheckIcon,
  ChevronDoubleUpIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"

const TodoList = () => {
  const router = useRouter()
  const { idList } = router.query
  const { todoList, deleteTodo, deleteTodoList } = useContext()

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

  const handleClickDeleteList = useCallback(
    (e) => {
      const listId = Number.parseInt(
        e.currentTarget.getAttribute("data-task-list-id"),
        10
      )
      deleteTodoList(listId)
    },
    [deleteTodoList]
  )

  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>

      <div className="sticky top-0 bg-white">
        <div className="flex">
          {todoList.map((taskList) => (
            <div key={taskList.id}>
              <ul className="flex gap pt-1">
                <Link
                  href={`/lists/list?idList=${taskList.id}`}
                  className="p-2 border-t border-r rounded-t-lg font-bold cursor-pointer"
                >
                  <span className="p-2">{taskList.name}</span>
                  {taskList.task.length === 0 ? (
                    <span className="p-2 pt-0 pb-0 bg-blue-400 text-sm rounded-lg">
                      {taskList.task.length}
                    </span>
                  ) : (
                    <>
                      <span className="pr-2 pl-2 pt-0 pb-0 bg-green-400 text-sm rounded-lg">
                        0
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
                  <div
                    className={`${
                      taskList.id === id ? "bg-slate-300 pt-1" : ""
                    }`}
                  ></div>
                </div>
              ) : (
                <div className="bg-slate-300 rounded-2xl">
                  <div
                    className={`${
                      taskList.id === id ? "bg-green-400 pt-1 rounded-2xl" : ""
                    }`}
                    style={{
                      width: `${(1 / taskList.task.length) * 100}%`,
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
            <Button data-task-list-id={id} onClick={handleClickDeleteList}>
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
            Add new list here !
          </span>
        )}
      </div>

      {todoListSelected ? (
        <>
          {todoListSelected.task.length > 0 ? (
            <>
              {todoListSelected.task.map((taskItem) => (
                <p key={taskItem.id} className="flex pl-4 border-b-2">
                  <input
                    name="tasks"
                    type="checkbox"
                    className="w-5 accent-green-400 cursor-pointer"
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
                    <TrashIcon className="w-5 " />
                  </Button>
                </p>
              ))}
            </>
          ) : (
            <span className="flex text-2xl font-bold">
              Add task or new list !
            </span>
          )}
        </>
      ) : null}
    </>
  )
}

export default TodoList
