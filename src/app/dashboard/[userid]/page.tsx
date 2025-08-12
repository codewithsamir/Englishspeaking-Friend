import CallPage from '@/components/Callpage'
import { Suspense } from 'react';



const page = async ({params}:RouteParams) => {
    const started = "user";
    const {userid} = await params;

    return (

        <Suspense fallback={<h1>Loading......</h1>} >
<CallPage speaker={started} userId={userid} userName='' type={} />

        </Suspense>


    )
}

export default page