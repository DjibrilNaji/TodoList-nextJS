import NavBar from "@/components/Navbar"
import TodoList from "@/components/TodoList"
import Head from "next/head"

const Home = () => {
  return (
    <>
      <Head>
        <title>TodoList</title>
      </Head>

      <NavBar />
      <TodoList />
    </>
  )
}

export default Home
