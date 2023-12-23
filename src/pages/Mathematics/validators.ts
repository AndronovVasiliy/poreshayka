import * as yup from 'yup';
export const responseValidator = (equations: any) => {
    const schemaObject: any = {};
    equations.forEach((equationObj: any) => {
        schemaObject[equationObj.equation] = yup.string().test('as', (d) => `${d.path} is not James` ,(value) => {
            console.log('valeVal', value)
            console.log('equationObj.x', equationObj.x)
           return value === equationObj.x
        })
    })
    console.log('schemaObject', schemaObject)
    return yup.object(schemaObject)
}
