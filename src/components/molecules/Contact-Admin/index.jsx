import Card from "@components/atoms/Card";

const ContactAdmin = () => {
  return (
    <div>
      <Card className="w-full px-5 py-5 m-auto ">
        <div className="mb-2">
          <h1>Admin Bagian Akademik</h1>
          <p className="text-[14px]">- 0882-1610-8940</p>
        </div>
        <div>
          <h1>Admin Bagian Keuangan</h1>
          <p className="text-[14px]">- 0888-0538-9075</p>
        </div>
      </Card>
    </div>
  );
};

export default ContactAdmin;
