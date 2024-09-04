import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage";
import CategoryContextProvider from "./contexts/CategoryContextProvider/CategoryContextProvider";
import TasksContainer from "./containers/TasksContainer/TasksContainer";

function App() {
  return (
    <>
      <CategoryContextProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<TasksContainer />} />
              <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
          </Routes>
        </BrowserRouter>
      </CategoryContextProvider>
    </>
  )
}

export default App;
