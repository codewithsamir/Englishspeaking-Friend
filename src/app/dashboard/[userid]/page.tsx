import { getCurrentsUser } from "@/action/auth.action";
import CallPage from "@/components/Callpage";

const page = async ({ params }: any) => {
  const { userid } =await params;
  const user = await getCurrentsUser()
  const {name}:any =  user;


  return <CallPage userId={userid} userName={name} type="generate" />;
};

export default page;
