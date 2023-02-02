// get parameters from class
export type ConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never;
