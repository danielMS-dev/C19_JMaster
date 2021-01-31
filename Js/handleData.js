class HandleLocalStorage {
  key;
  value;
  constructor({ key, value }) {
    this.key = key;
    this.value = value;
  }
  setData = () => localStorage.setItem(this.key, this.value);
  getData = (key) =>  {     
    let data = localStorage.getItem(key);
    return JSON.parse(data);
  };
  removeData = (key) => localStorage.removeItem(key);
  existData = (key) => !!localStorage.getItem(key) 
}


export class HandleData extends HandleLocalStorage {
  constructor( key, value ) {
    super({ key, value });
  }
}
