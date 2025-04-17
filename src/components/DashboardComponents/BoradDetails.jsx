import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import image1 from "../../assets/peopleimage1.png";
import image2 from "../../assets/peopleimage2.png";
const ItemDetails = ({ item }) => {
  // For demonstration purposes, I'm creating a sample item
  // In a real application, you would pass this as a prop or fetch it from an API
  const sampleItem = {
    title: "Placeholder for text",
    status: "Active",
    priority: "High",
    date: "24 July, 2024",
    board: "XYZ Board",
    people: [image1, image2],
    timeTracking: "8 Hours",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Curabitur ac velit nec purus volutpat feugiat. This task involves coordinating with the design and development teams to ensure deliverables are aligned with project goals.",
    lastUpdated: "14 April, 2024 - By John",
  };

  // Use the passed item or fall back to sample
  const displayItem = item || sampleItem;

  return (
    <div className="flex-1 p-[40px] overflow-auto bg-gray-100 h-auto">
      {/* Breadcrumb navigation */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/board/1" className="hover:underline">
          Board 1
        </Link>{" "}
        / Item Details
      </div>

      {/* Item title */}
      <h1 className="text-3xl font-bold mb-8">Item Details</h1>

      {/* Item details card */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-medium mb-6">{displayItem.title}</h2>

        {/* Item properties */}
        <div className="space-y-4">
          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="text-gray-500">Status</span>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded inline-block w-fit">
              {displayItem.status}
            </span>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="text-gray-500">Priority</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded inline-block w-fit">
              {displayItem.priority}
            </span>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="text-gray-500">Date</span>
            <span>{displayItem.date}</span>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="text-gray-500">People</span>
            <div className="flex">
              {displayItem.people &&
                displayItem.people.map((person, index) => (
                  <img
                    key={index}
                    src={person}
                    alt={`Person ${index + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0"
                  />
                ))}
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="text-gray-500">Board</span>
            <span>{displayItem.board}</span>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="text-gray-500">Time Tracking</span>
            <span>{displayItem.timeTracking}</span>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-start">
            <span className="text-gray-500">Description</span>
            <p className="text-gray-700">{displayItem.description}</p>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="text-gray-500">Last Updated</span>
            <span className="text-gray-700">{displayItem.lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
