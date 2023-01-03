import { useContext } from "@/components/ContextProvider"
import TaskForm from "@/components/TaskForm"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"

const CreateTaskListPage = () => {
  const router = useRouter()
  const { addTodoList } = useContext()

  const handleSubmit = useCallback(
    (values) => {
      addTodoList(values)
      router.push(`/lists/list?idList=1`)
    },
    [router, addTodoList]
  )

  return (
    <>
      <Head>
        <title>Create todo list</title>
      </Head>

      <header className="flex py-2 px-4 text-xl	font-bold border-b-2">
        <h1>Create a new list</h1>
        <Link href={`/lists/list?idList=1`} className="ml-auto">
          <XMarkIcon className="w-7"></XMarkIcon>
        </Link>
      </header>

      <TaskForm onSubmit={handleSubmit} buttonName="Create" />
    </>
  )
}

export default CreateTaskListPage
