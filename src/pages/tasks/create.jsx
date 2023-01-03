import { useContext } from "@/components/ContextProvider"
import TaskForm from "@/components/TaskForm"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"

const CreateTaskPage = () => {
  const router = useRouter()

  const { addTodo } = useContext()
  const { idList } = router.query

  const id = Number.parseInt(idList, 10)

  const handleSubmit = useCallback(
    (values) => {
      addTodo(values)
      router.push(`/lists/list?idList=${id}`)
    },
    [router, addTodo, id]
  )

  return (
    <>
      <Head>
        <title>Create task</title>
      </Head>

      <header className="flex py-2 px-4 text-xl	font-bold border-b-2">
        <h1>Create a new task</h1>
        <Link href={`/lists/list?idList=${id}`} className="ml-auto">
          <XMarkIcon className="w-7"></XMarkIcon>
        </Link>
      </header>

      <TaskForm onSubmit={handleSubmit} buttonName="Create" />
    </>
  )
}

export default CreateTaskPage
