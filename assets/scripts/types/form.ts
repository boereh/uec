export type RuleFn =
    | ((value: any) => Promise<string | undefined>)
    | ((value: any) => string | undefined)
