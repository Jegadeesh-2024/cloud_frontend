
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from './routes/AppRouter'
// import FileUpload from "./pages/FileUpload";

const App = () => {
  return (
    <div>
      <AppRouter />
      <ToastContainer />
      {/* <FileUpload/> */}

     
      
    </div>
  )
}

export default App
