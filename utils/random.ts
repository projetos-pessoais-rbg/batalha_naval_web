export function randomCoordinates(size: number) {
    return {x: Math.floor(Math.random()*size), y:Math.floor(Math.random()*size)}
}

export function randomOrientation() : 'horizontal' | 'vertical' {
    const options = ['horizontal', 'vertical'] as const;
    return options[Math.floor(Math.random() * options.length)];   
}