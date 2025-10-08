import { ToastError } from "../components/toast";
export const handleApiError = (error, setError) => {
  const rawMessage = error?.message;

  if (typeof rawMessage === 'string') {
    ToastError(rawMessage);
  } else if (
    typeof rawMessage === 'object' &&
    typeof rawMessage.message === 'string'
  ) {
    // Handle nested message like error.message.message
    ToastError(rawMessage.message);
  } else if (typeof rawMessage === 'object') {
    // Handle field-level validation errors
    Object.entries(rawMessage).forEach(([field, messages]) => {
      const message =
        Array.isArray(messages) && messages.length > 0
          ? messages[0]
          : 'This field is required';
      if (setError && typeof setError === 'function') {
        setError(field, {
          type: 'manual',
          message,
        });
      } else {
        ToastError(message);
      }
    });
  } else {
    ToastError('Something went wrong, please try again later.');
  }
};
