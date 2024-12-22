import { v4 as uuidv4 } from "uuid";

export const TOAST_EVENT = "toast";

const useToast = () => {
  const toast = ({ variant, message, duration }) => {
    const payload = {
      id: uuidv4(),
      variant,
      message,
      duration,
    };

    const customEvent = new CustomEvent(TOAST_EVENT, { detail: payload });
    window.dispatchEvent(customEvent);
  };

  return toast;
};

export default useToast;
