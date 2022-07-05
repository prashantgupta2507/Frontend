import { toast } from "react-toastify";

const toastStyle = {
  position: "bottom-center",
  autoClose: 1500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  closeButton: false,
};

const toastMessage = (msg, type) => {
  switch (type) {
    case "info":
      toast.info(msg, toastStyle);
      break;
    case "error":
      toast.error(msg, toastStyle);
      break;
    case "success":
      toast.success(msg, toastStyle);
      break;
    case "warning":
      toast.warning(msg, toastStyle);
      break;
    default:
      toast.info(msg, toastStyle);
      break;
  }
};

export default toastMessage;