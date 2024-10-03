

type StorageItem<T> = {
    value: T;
    expiry: number;
  };
  
  export function setItemWithExpiry<T>(key: string, value: T, expiryInMinutes: number): void {
    const now = new Date();
  
    // `item` is an object that contains the value and expiry time.
    const item: StorageItem<T> = {
      value: value,
      expiry: now.getTime() + expiryInMinutes * 60 * 1000, // expiryInMinutes converted to milliseconds
    };
  
    localStorage.setItem(key, JSON.stringify(item));
  }
  
  export function getItemWithExpiry<T>(key: string,Id?:string): T | null {
    const itemStr = localStorage.getItem(key);
    
    const userIdStore = localStorage.getItem("user_id");
    // If the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
  
    const item: StorageItem<T> = JSON.parse(itemStr);
    
    const now = new Date();
  
    // Compare the expiry time with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, remove it from storage and return null
      localStorage.removeItem(key);
      return null;
    }
    
    if (userIdStore&&userIdStore!==Id ) {
      // If the item is expired, remove it from storage and return null

      localStorage.removeItem(key);
      localStorage.removeItem("user_id");
      return null;
    }
    return item.value;
  }
  