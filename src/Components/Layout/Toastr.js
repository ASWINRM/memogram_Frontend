import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const PostDeleteToastr = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}>
      {toast.info("Deleted Successfully", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
      })}
    </ToastContainer>
  );
};