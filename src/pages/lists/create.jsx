import { useContext } from "@/components/ContextProvider"
import TaskListForm from "@/components/TaskListForm"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"

const CreateTaskListPage = () => {
  const router = useRouter()
  const { createTodoList, nextListTodoId } = useContext()
  const listId = Number.parseInt(nextListTodoId, 10)

  const handleSubmit = useCallback(
    (values) => {
      createTodoList(listId, values)
      router.push(`/?listId=${listId}`)
    },
    [router, createTodoList, listId]
  )

  return (
    <>
      <Head>
        <title>Create list</title>
      </Head>

      <header className="flex py-2 px-4 text-xl	font-bold border-b-2">
        <h1>Create a new list</h1>
        <Link href={`/`} className="ml-auto">
          <XMarkIcon className="w-7"></XMarkIcon>
        </Link>
      </header>

      <TaskListForm onSubmit={handleSubmit} buttonName="Create" />
    </>
  )
}

export default CreateTaskListPage
