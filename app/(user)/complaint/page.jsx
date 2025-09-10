import { getUserComplaints } from '@/Actions/Complaint';
import React from 'react';
import TrackTable from './_components/TrackTable';

const TrackPage = async () => {
  const complaints = await getUserComplaints();

  return (
    <div className="container mx-auto px-4 mt-10 animate-fadeIn">
      <h1 className="text-3xl font-bold text-[#185b30] mb-6 text-center tracking-wide drop-shadow-sm">
        Track Your Complaints
      </h1>

      <div className="transition-transform duration-300 ease-in-out hover:scale-[1.01]">
        <TrackTable complaints={complaints?.data || []} />
      </div>
    </div>
  );
};

export default TrackPage;
