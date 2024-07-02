export type Month = {
  year: number;
  month: number;
};

export type LoginProps = {
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

export type MainProps = {
  userId: string;
  yearMonth: Month;
  setYearMonth: React.Dispatch<React.SetStateAction<Month>>;
  date: number;
  setDate: React.Dispatch<React.SetStateAction<number>>;
};

export type DetailProps = Omit<Omit<MainProps, "setYearMonth">, "setDate">;

export type PostingProps = DetailProps;

export type StatProps = Omit<Omit<MainProps, "date">, "setDate">;

export type HeaderProps = {};

export type ControllerProps = {
  yearMonth: Month;
  setYearMonth: React.Dispatch<React.SetStateAction<Month>>;
};

export type CalendarProps = {};

export type CalendarButtonProps = {
  date: number | null;
  day: number;
};
