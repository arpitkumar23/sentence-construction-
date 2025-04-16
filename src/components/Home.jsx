import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCoins } from 'react-icons/fa';
import { PencilIcon } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/test');  
  };

  return (
    <div className=" mt-5 flex items-center justify-center   from-gray-100 to-white">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl text-center">
        <div className="flex flex-col items-center mb-6">
          <PencilIcon className="w-10 h-10 text-gray-600 mb-2" />
          <h1 className="text-2xl font-bold">Sentence Construction</h1>
          <p className="text-sm text-gray-500 mt-1">
            User have to construct a sentence with random words by placing it in a correct order.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div>
            <p className="text-sm text-gray-400">Time Per Question</p>
            <p className="text-md font-semibold">30 sec</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Questions</p>
            <p className="text-md font-semibold">10</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Coins</p>
            <p className="text-md font-semibold flex justify-center items-center gap-1">
              <FaCoins className="text-yellow-500" /> 0 coins
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
