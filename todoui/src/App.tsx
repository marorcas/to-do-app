import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage";
import CategoryContextProvider from "./contexts/CategoryContextProvider/CategoryContextProvider";
import TaskContextProvider from "./contexts/TaskContextProvider/TaskContextProvider";
import TasksPage from "./pages/TasksPage/TasksPage";

function App() {
  return (
    <>
      <CategoryContextProvider>
        <TaskContextProvider>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<TasksPage />} />
                <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
            </Routes>
          </BrowserRouter>
        </TaskContextProvider>
      </CategoryContextProvider>
    </>
  )
}

export default App;
