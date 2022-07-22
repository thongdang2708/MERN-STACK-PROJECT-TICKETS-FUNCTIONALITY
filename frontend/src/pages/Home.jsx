
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {


  return (
    <div className="h-screen">
        <div className='heading'>
          <h1 className="text-center font-bold text-black text-3xl mb-10"> What do you need help with? </h1>
          <p className="text-center font-bold text-gray-500 text-xl"> Please choose from an option below </p>
        </div>

        <div>
            <Link to="/new-ticket">
              <div className="text-center my-10">
                <div className="btn btn-lg bg-white text-black focus:outline-0 w-9/12 xl:w-5/12 lg:w-6/12 md:w-7/12 hover:bg-sky-500"> Create New Ticket </div>
              </div>
            </Link>

            <Link to="/tickets">
              <div className="text-center">
                <div className="btn btn-lg btn-block w-9/12 xl:w-5/12 lg:w-6/12 md:w-7/12 focus:outline-0 hover:bg-sky-500"> View Tickets </div>
              </div>

            </Link>
        </div>
    </div>
  )
}

export default Home