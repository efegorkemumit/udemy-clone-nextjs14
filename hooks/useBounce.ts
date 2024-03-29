import { useEffect, useState } from "react";


export function useBounce<T>(value:T, delay?:number):T{

    const [debouncedValue, SetDebouncedValue] = useState<T>(value);

    useEffect(()=>{

        const timer = setTimeout(() => {
            SetDebouncedValue(value)
        }, delay || 500);

        return ()=>{
            clearTimeout(timer)
        }




    }, [value, delay]);


    return debouncedValue;




}