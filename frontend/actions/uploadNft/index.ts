'use server'

export const serAct = async(formdata : FormData)=>{
    console.log(formdata)
    console.log(formdata.get('price'))
    console.log('in here in the server actions')
}