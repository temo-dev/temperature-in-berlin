import { DataTypeTemperatue } from "./types";

export function clearLocalStorage() {
  localStorage.clear();
}

export function setItemInLocal(cname: string, cvalue: DataTypeTemperatue) {
  if (cname == null) return;
  const listItems: DataTypeTemperatue[] = JSON.parse(
    localStorage.getItem(cname) || "[]"
  );
  listItems.push(cvalue);
  localStorage.setItem(cname, JSON.stringify(listItems));
}

export function setItemsInLocal(cname: string, cvalue: DataTypeTemperatue[]) {
  if (cname == null) return;
  localStorage.setItem(cname, JSON.stringify(cvalue));
}

export function getItemInLocal(cname: string) {
  const cvalue = localStorage.getItem(cname);
  return cvalue ? JSON.parse(cvalue) : "";
}
