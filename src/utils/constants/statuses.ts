interface IStatuses {
  [key: string]: string;
}
export const STATUSES: IStatuses = {
  done: "Выполнен",
  pending: "Готовится",
  created: "Создан"
};
