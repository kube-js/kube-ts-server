import { isBoolean } from "util";

const documentToItemBoolean = (value: any) =>
  isBoolean(value) && Boolean(value) ? 1 : 0;

  export default documentToItemBoolean;
