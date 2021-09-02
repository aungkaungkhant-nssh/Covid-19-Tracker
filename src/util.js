export const sortData=(data)=>{
       return  data.sort((a,b)=>{
            return b.cases-a.cases;
        })
}