import { BrowserRouter, Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TasksPage/TasksPage";
import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage";
import CategoryContextProvider from "./contexts/CategoryContextProvider/CategoryContextProvider";

function App() {
  return (
    <>
      <h1>To Do List</h1>
      <BrowserRouter>
        <Routes>
          <CategoryContextProvider>
            <Route path="/" element={<TasksPage />} />
            <Route path="/tasks/add" element={<CreateTaskPage />} />
            <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
          </CategoryContextProvider>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
