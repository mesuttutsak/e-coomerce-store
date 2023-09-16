export default function findMinMaxByProperty(objList: any[], property: string): { min: any, max: any } {
    if (objList.length === 0) {
      throw new Error("Liste boş.");
    }
  
    if (!(property in objList[0])) {
      throw new Error("Belirtilen özellik mevcut değil.");
    }
  
    let min = objList[0][property];
    let max = objList[0][property];
  
    for (const obj of objList) {
      if (obj[property] < min) {
        min = obj[property];
      }
      if (obj[property] > max) {
        max = obj[property];
      }
    }
  
    return { min, max };
  }