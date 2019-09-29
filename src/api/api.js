import { openDB, deleteDB } from "idb";

const create = () => {

}

const read =  () => {

}

const update = () => {

}

const delete =  () => {
  const db = await openDB(dbName, version);
  return (await db).delete(storeName, user.id);
}
