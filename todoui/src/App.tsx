import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage";
import CategoryContextProvider from "./contexts/CategoryContextProvider/CategoryContextProvider";
import TaskContextProvider from "./contexts/TaskContextProvider/TaskContextProvider";
import TasksPage from "./pages/TasksPage/TasksPage";
import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage";
import CreateCategoryPage from "./pages/CreateCategoryPage/CreateCategoryPage";

function App() {
  return (
    <>
      <CategoryContextProvider>
        <TaskContextProvider>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<TasksPage />} />
                <Route path="/categories/new" element={<CreateCategoryPage />} />
                <Route path="/tasks/new" element={<CreateTaskPage />} />
                <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
            </Routes>
          </BrowserRouter>
        </TaskContextProvider>
      </CategoryContextProvider>
    </>
  )
}

export default App;
