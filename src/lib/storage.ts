
// Simple localStorage wrapper for data persistence

export const saveData = (key: string, data: any): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(`study-catcher-${key}`, serializedData);
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

export const loadData = (key: string): any => {
  try {
    const serializedData = localStorage.getItem(`study-catcher-${key}`);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return undefined;
  }
};

export const removeData = (key: string): void => {
  try {
    localStorage.removeItem(`study-catcher-${key}`);
  } catch (error) {
    console.error('Error removing data from localStorage:', error);
  }
};

export const clearAllData = (): void => {
  try {
    // Only clear keys that start with our app prefix
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('study-catcher-')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing all data from localStorage:', error);
  }
};
