import { formatNumberToCop } from "@/utils/utils";

type TotalDisplayProps = {
  totalAmount: number;
};

const TotalDisplay = ({ totalAmount }: TotalDisplayProps) => {
  const totalExpenses = formatNumberToCop(totalAmount);

  return (
    <div className="flex flex-1 justify-between items-center mt-5">
      <p className=" text-lg font-semibold">Total gastos:</p>
      <p className="text-lg ">{totalExpenses}</p>
    </div>
  );
};

export default TotalDisplay;
