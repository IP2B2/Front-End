
const classPack = (...classes) => {
    return classes.filter(className => className?.trim()).map(className => className.trim()).join(' ');
}

export default classPack;