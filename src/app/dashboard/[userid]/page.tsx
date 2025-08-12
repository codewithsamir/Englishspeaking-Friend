import CallPage from "@/components/Callpage";

const page = async ({ params }: any) => {
  const { userid } =await params;
  const userName = "samir"; // fill with actual username if you have it

  return <CallPage userId={userid} userName={userName} type="generate" />;
};

export default page;
