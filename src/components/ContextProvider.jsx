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
    task: [{ id: 1, description: "Initial Task", checked: false }],
  },
]

export const Context = createContext()
export const useContext = () => useNativeContext(Context)

const ContextProvider = (props) => {
  const [nextTodoId, setNextTodoId] = useState(2)
  const [nextListTodoId, setNextListTodoId] = useState(2)
  const [todoList, setTodoList] = useState(initialTodoList)
  const [toggle, setToggle] = useState(false)

  const router = useRouter()
  const { listId } = router.query
  const id = Number.parseInt(listId, 10)

  const getNextTodoId = useCallback(() => {
    setNextTodoId(nextTodoId + 1)

    return nextTodoId
  }, [nextTodoId])

  const completeTask = useCallback(
    (id) => {
      setTodoList((todoList) =>
        todoList.map((task) => {
          return {
            ...task,
            task: task.task.map((task) => {
              if (task.id === id) {
                return { ...task, checked: !task.checked }
              }

              return task
            }),
          }
        })
      )
    },
    [setTodoList]
  )

  const filterTask = useCallback(() => {
    setToggle(!toggle)
  }, [toggle])

  const createTodo = useCallback(
    (task) => {
      setTodoList((todoList) =>
        todoList.map((taskList) =>
          taskList.id === id
            ? {
                ...taskList,
                task: [
                  ...taskList.task,
                  { id: getNextTodoId(), ...task, checked: false },
                ],
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

  const createTodoList = useCallback(
    (newListId, item) => {
      setTodoList((taskList) => [
        ...taskList,
        { id: newListId, name: item.name, task: [] },
      ])
      setNextListTodoId(nextListTodoId + 1)
    },
    [nextListTodoId]
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
        toggle,
        nextListTodoId,
        createTodo,
        completeTask,
        filterTask,
        deleteTodo,
        updateTodo,
        createTodoList,
        updateTodoList,
        deleteTodoList,
      }}
    />
  )
}

export default ContextProvider
