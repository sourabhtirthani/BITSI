'use server'


type SerActResult = { success: boolean } | { error: string } | { data: any };
export const serAct = async(formdata : FormData | null): Promise<SerActResult>=>{
    try{
    console.log(formdata)
    if(formdata != null){
    console.log(formdata.get('price'))
    }
    console.log('in here in the server actions')
    return {success : true};
}catch(error){
    return {error : 'error occured'}
}
}