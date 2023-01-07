import { useContext } from "@/components/ContextProvider"
import TaskForm from "@/components/TaskForm"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"

const CreateTaskPage = () => {
  const router = useRouter()

  const { createTodo } = useContext()
  const { listId } = router.query

  const id = Number.parseInt(listId, 10)

  const handleSubmit = useCallback(
    (values) => {
      createTodo(values)
      router.push(`/?listId=${id}`)
    },
    [router, createTodo, id]
  )

  return (
    <>
      <Head>
        <title>Create task</title>
      </Head>

      <header className="flex py-2 px-4 text-xl	font-bold border-b-2">
        <h1>Create a new task</h1>
        <Link href={`/?listId=${id}`} className="ml-auto">
          <XMarkIcon className="w-7"></XMarkIcon>
        </Link>
      </header>

      <TaskForm onSubmit={handleSubmit} buttonName="Create" />
    </>
  )
}

export default CreateTaskPage
