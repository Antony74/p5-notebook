const sketches = {};

export const p5WithCleanup = (sketch, id) => {
    const elm = document.getElementById(id);
    if (!elm) {
        throw new Error(`p5WithCleanup: element with id ${id} not found`);
    }

    if (sketches[id]) {
        elm.innerHTML = '';
    }

    const p5Instance = new p5(sketch, id);
    sketches[id] = p5Instance;
    return p5Instance;
};

export default { hello: 6 };
