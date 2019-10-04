import { openDB } from "idb";

export const createRecord = async (dbName, version, storeName, user) => {
  const db = await openDB(dbName, version);
  await db.add(storeName, {
    name: user.name,
    email: user.email,
    status: user.status
  });   
}

export const getRecords =  async(dbName, version, storeName) => {
  const db = await openDB(dbName, version);
  const items = await db.getAllFromIndex(storeName, "id");
  return items;

}

export const updateRecord = async (dbName, version, storeName, user) => {
    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status
    };

    const db = await openDB(dbName, version, {
      upgrade(db) {
        db.createObjectStore(storeName);
      }
    });

    return (await db).put(storeName, newUser);
}

export const deleteRecord = async(dbName, version, storeName, userId) => {
  const db = await openDB(dbName, version);
  return db.delete(storeName, userId);
}
