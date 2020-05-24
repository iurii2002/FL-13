// TODO: Your code goes here

const assign = (target, ...sources) => {
    for (let source of sources) {
        for (let [key, value] of Object.entries(source)) {
            target[key] = value;
          }
    }
    return target;
};