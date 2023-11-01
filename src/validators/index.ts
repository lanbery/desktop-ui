export * from './comm-validators'

// ((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})
// ^[w_-]{4,50}$
export const checkPassRule = (password: string): boolean => /^[\w\W]{4,50}$/.test(password)
