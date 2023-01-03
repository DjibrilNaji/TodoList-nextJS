import { useContext } from "@/components/ContextProvider"
import { ChevronDoubleUpIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

const Home = () => {
  const { todoList } = useContext()

  return (
    <>
      <div className="flex">
        {todoList.map((taskList) => (
          <div key={taskList.id}>
            <ul className="flex gap pt-1">
              <Link
                href={`/lists/list?idList=${taskList.id}`}
                className="p-2 border-2 rounded-lg font-bold"
              >
                <span className="p-2">{taskList.name}</span>
              </Link>
            </ul>
          </div>
        ))}
      </div>

      <span className="flex p-2 text-2xl font-bold">
        <ChevronDoubleUpIcon className="w-7" />
        Select this default list !
      </span>
    </>
  )
}

export default Home
