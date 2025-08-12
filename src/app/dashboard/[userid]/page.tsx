import CallPage from '@/components/Callpage'
import { Suspense } from 'react';



const page = ({params}:RouteParams) => {
    const started = "user";

    return (

        <Suspense fallback={<h1>Loading......</h1>} >
<CallPage speaker={started} />

        </Suspense>


    )
}

export default page