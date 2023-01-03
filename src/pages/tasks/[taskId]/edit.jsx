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

  const id = Number.parseInt(idList, 10) - 1

  const handleSubmit = useCallback(
    (values) => {
      updateTodo(values)
      router.push(`/lists/list?idList=${idList}`)
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
        <Link href={`/lists/list?idList=${idList}`} className="ml-auto">
          <XMarkIcon className="w-7"></XMarkIcon>
        </Link>
      </header>

      <TaskForm
        buttonName="Save"
        onSubmit={handleSubmit}
        initialValues={todoList[id].task.find((task) => task.id === taskId)}
      />
    </>
  )
}

export default TaskEditPage
