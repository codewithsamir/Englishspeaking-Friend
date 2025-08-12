import { getCurrentsUser } from "@/action/auth.action";
import CallPage from "@/components/Callpage";

const page = async ({ params }: any) => {
  const { userid } =await params;
  const user = await getCurrentsUser()
  const {name,id}:any =  user;

  return <CallPage userId={id} userName={name} type="generate" />;
};

export default page;
