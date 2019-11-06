

const documentToItemNumber = (value: any) =>
  !Number.isNaN(value) ? Number(value) : 0;

  export default documentToItemNumber;
