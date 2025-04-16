
/**
 * Packs classes into one string to be used in html tags
 * @param  {...string} classes 
 * @returns string for className
 * Usage: packClasses('border-rounded', Inter500.className, styles.classNames)
 */

export const packClasses = (...classes) => {

    var packedClasses = '';

    classes?.forEach((className) => {

        if(className.includes(' '))
            console.warn(`packClasses(): detected multiple classes in argument ${className} `);

        packedClasses += ` ${className}`;
    });

    return packedClasses;
}