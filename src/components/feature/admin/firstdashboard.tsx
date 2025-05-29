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
  return <div>first page</div>;
};

export default FirstDashboard;
