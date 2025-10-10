export const SHOW_LOG = process.env.NODE_ENV !== 'production';

export const show_log = (message, value) => {
  if (!SHOW_LOG) return;

  const type = typeof value;

  switch (type) {
    case 'undefined':
      console.log(message, undefined);
      break;

    case 'boolean':
    case 'number':
    case 'string':
      console.log(message, value);
      break;

    case 'object':
      if (value === null) {
        console.log(message, null);
      } else {
        // Use JSON.stringify safely
        try {
          console.log(message, JSON.stringify(value, null, 2));
        } catch (err) {
          console.log(message, '[Unserializable Object]');
        }
      }
      break;

    default:
      console.log(message, value);
      break;
  }
};
