import { useRouter } from "next/router"
import {
  createContext,
  useCallback,
  useContext as useNativeContext,
  useState,
} from "react"

const initialTodoList = [
  {
    id: 1,
    name: "Homeworks",
    task: [{ id: 1, description: "Initial Task" }],
  },
]

export const Context = createContext()

export const useContext = () => useNativeContext(Context)

const ContextProvider = (props) => {
  const [nextTodoId, setNextTodoId] = useState(2)
  const [nextListTodoId, setNextListTodoId] = useState(2)
  const [todoList, setTodoList] = useState(initialTodoList)

  const router = useRouter()
  const { idList } = router.query
  const id = Number.parseInt(idList, 10)

  const getNextTodoId = useCallback(() => {
    setNextTodoId(nextTodoId + 1)

    return nextTodoId
  }, [nextTodoId])

  const getNextTodoListId = useCallback(() => {
    setNextListTodoId(nextListTodoId + 1)

    return nextListTodoId
  }, [nextListTodoId])

  const addTodo = useCallback(
    (task) => {
      setTodoList((todoList) =>
        todoList.map((taskList) =>
          taskList.id === id
            ? {
                ...taskList,
                task: [...taskList.task, { id: getNextTodoId(), ...task }],
              }
            : taskList
        )
      )
    },
    [getNextTodoId, id]
  )

  const updateTodo = useCallback((updateTodo) => {
    setTodoList((todoList) =>
      todoList.map((taskList) => {
        return {
          ...taskList,
          task: taskList.task.map((task) => {
            if (task.id === updateTodo.id) {
              return updateTodo
            }

            return task
          }),
        }
      })
    )
  }, [])

  const deleteTodo = useCallback(
    (taskId) => {
      setTodoList((todoList) =>
        todoList.map((taskList) =>
          taskList.id === id
            ? {
                ...taskList,
                task: taskList.task.filter(({ id }) => id != taskId),
              }
            : taskList
        )
      )
    },
    [id]
  )

  const addTodoList = useCallback(
    (item) => {
      setTodoList((taskList) => [
        ...taskList,
        { id: getNextTodoListId(), name: item.description, task: [] },
      ])
    },
    [getNextTodoListId]
  )

  const updateTodoList = useCallback((updateTodoList) => {
    setTodoList((taskList) =>
      taskList.map((list) =>
        list.id === updateTodoList.id ? updateTodoList : list
      )
    )
  }, [])

  const deleteTodoList = useCallback((listId) => {
    setTodoList((todoList) => todoList.filter(({ id }) => id !== listId))
  }, [])

  return (
    <Context.Provider
      {...props}
      value={{
        todoList,
        addTodo,
        deleteTodo,
        updateTodo,
        addTodoList,
        updateTodoList,
        deleteTodoList,
      }}
    />
  )
}

export default ContextProvider
