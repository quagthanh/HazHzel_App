"use client";
interface FirstDashboardProps {
  user: {
    name: string;
    _id?: string;
    email?: string;
    access_token?: string;
    id?: string;
  };
}
const FirstDashboard = (props: any) => {
  const { session } = props;
  return (
    <>
      <div>name: {session?.user?.name ?? "Fetch name failed"}</div>
      <div>access token: {"Fetch access_token failed"}</div>
    </>
  );
};

export default FirstDashboard;
