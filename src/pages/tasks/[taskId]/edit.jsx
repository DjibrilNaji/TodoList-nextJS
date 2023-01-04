import { useContext } from "@/components/ContextProvider"
import TaskForm from "@/components/TaskForm"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      taskId: Number.parseInt(params.taskId, 10),
    },
  },
})

const TaskEditPage = (props) => {
  const {
    params: { taskId },
  } = props

  const router = useRouter()
  const { updateTodo, todoList } = useContext()
  const { idList } = router.query

  const task = todoList
    .flatMap((obj) => obj.task)
    .filter((items) => items.id === taskId)[0]

  const handleSubmit = useCallback(
    (values) => {
      updateTodo(values)
      router.push(`/?idList=${idList}`)
    },
    [router, updateTodo, idList]
  )

  return (
    <>
      <Head>
        <title>Edit task</title>
      </Head>

      <header className="flex py-2 px-4 text-xl	font-bold border-b-2">
        <h1>Edit task</h1>
        <Link href={`/?idList=${idList}`} className="ml-auto">
          <XMarkIcon className="w-7"></XMarkIcon>
        </Link>
      </header>

      <TaskForm
        buttonName="Save"
        onSubmit={handleSubmit}
        initialValues={task}
      />
    </>
  )
}

export default TaskEditPage
