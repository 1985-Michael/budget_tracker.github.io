let db;
const request = indexedDB.open('budget', 1);

request.onupgradeneeded = event => {
  let db;
  db = event.target.result;
  db.createObjectStore('pending', { autoIncrement: true });
};

request.onsuccess = event => {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = event => {
  console.log('Woops! ' + event.target.errorCode);
};

function saveRecord(record) {
  let transaction;
  transaction = db.transaction(['pending'], 'readwrite');

  let store = transaction.objectStore('pending');

  store.add(record);
}

function checkDatabase() {
  const transaction = db.transaction(['pending'], 'readwrite');
  let store = transaction.objectStore('pending');
  let getAll;

  getAll = store.getAll();

  getAll.onsuccess = () => {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          return response.json();
        })

        .then(() => {
          const transaction = db.transaction(['pending'], 'readwrite');
          let store = transaction.objectStore('pending');
          store.clear();
        });
    }
  };
}

window.addEventListener('online', checkDatabase);
