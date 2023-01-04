import { useContext } from "@/components/ContextProvider.jsx"
import TaskListForm from "@/components/TaskListForm"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      params: {
        listId: Number.parseInt(params.listId, 10),
      },
    },
  }
}

const ListEditPage = (props) => {
  const {
    params: { listId },
  } = props

  const router = useRouter()
  const { updateTodoList, todoList } = useContext()

  const handleSubmit = useCallback(
    (values) => {
      updateTodoList(values)
      router.push(`/?idList=${listId}`)
    },
    [router, updateTodoList, listId]
  )

  return (
    <>
      <Head>
        <title>Edit todo list</title>
      </Head>

      <header className="flex py-2 px-4 text-xl	font-bold border-b-2">
        <h1>Edit list</h1>
        <Link href={`/?idList=${listId}`} className="ml-auto">
          <XMarkIcon className="w-7"></XMarkIcon>
        </Link>
      </header>

      <TaskListForm
        buttonName="Save"
        onSubmit={handleSubmit}
        initialValues={todoList.find(({ id }) => id === listId)}
      />
    </>
  )
}

export default ListEditPage
