
/**
 * Utility function to pack class names into a single string.
 * @param  {...string} classes 
 * @returns {string} A single string containing all the class names, separated by spaces.
 * This function filters out any falsy values, trims whitespace from each class name.
 */

const classPack = (...classes) => {
    return classes.filter(className => className !== undefined).filter(className => className?.trim()).map(className => className.trim()).join(' ');
}

export default classPack;