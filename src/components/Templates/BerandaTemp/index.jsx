import CalenderAcademic from "@components/molecules/Calender-Academic";
import CardName from "@components/molecules/CardName";
import ContactAdmin from "@components/molecules/Contact-Admin";
import EventList from "@components/molecules/EventList";

const BerandaTemp = () => {
  return (
    <div className="py-10 ">
      <div className="w-full py-2">
        <CardName />
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="w-full lg:w-3/4">
          <CalenderAcademic />
        </div>
        <div className="w-full lg:w-1/4 lg:ml-auto">
          <div className="mb-2 lg:mb-2">
            <ContactAdmin />
          </div>
          <div className="mb-5 lg:mb-0">
            <EventList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BerandaTemp;
