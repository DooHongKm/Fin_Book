// DB user information
export interface UserType {
  id: string;
  pw: string;
}

// DB cost/income information
export interface DataType {
  index: number;
  date: string;
  cost: boolean;
  category: string;
  amount: number;
  memo: string;
}

// State (? -> main page)
export interface MainInfo {
  userId: string;
  year: number;
  month: number;
}

// State (? -> stat page)
export interface StatInfo extends MainInfo {}

// State (main page -> detail page)
export interface DetailInfo extends MainInfo {
  date: number;
}

// Props (header)
export interface HeaderProps extends MainInfo {
  works: boolean;
}

// Props (main controller)
export interface MainControllerProps {
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
}

// Props (calendar)
export interface CalendarProps extends MainInfo {}

// Props (calendar button)
export interface CalendarButtonProps {
  date: number | null;
  day: number;
}

// Props (graph)
export interface GraphProps extends MainInfo {}

// Props (graph input)
export interface NivoType {
  id: string;
  label: string;
  value: number;
  color: string;
}

// Props (detail controller)
export interface DetailControllerProps extends MainControllerProps {
  date: number;
  setDate: React.Dispatch<React.SetStateAction<number>>;
}

// Props (list)
export interface ListProps extends DetailInfo {
  showCost: boolean;
  setShowCost: React.Dispatch<React.SetStateAction<boolean>>;
}

// Props (list button)
export interface ListButtonProps extends Omit<DataType, "date"> {
  key: number;
  selectedIndex: number;
  // setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}
