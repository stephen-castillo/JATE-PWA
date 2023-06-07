import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    const db = await openDB("jate",1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({jate: content});
    const result = await request;
    console.log('Content added to the jate database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    const db = await openDB("jate",1);
    const tx = db.transaction('jate', 'readonly');
    const allContent = await tx.objectStore('jate').getAll();
    await tx.done;
    console.log('Content retrieved from the jate database', allContent);
    return allContent;
};

initdb();
