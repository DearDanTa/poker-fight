const baseFunction = {
  //扁平化数组，不管多少层
  flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
      return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
    }, []);
  },
  //超级洗牌
  superShuffling(arr) {
    let list = JSON.parse(JSON.stringify(arr));
    // console.log(list);
    // list.forEach(item => {
    //   let index = Math.floor(Math.random() * list.length);
    //   let template = list[index];
    //   list[index] = item;
    //   item = template;
    // });
    // console.log(list);
    list.sort(()=>{
      return Math.random()-0.5;
    })
    return list;
  }
};
export default baseFunction;
