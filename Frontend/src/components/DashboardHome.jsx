import React from 'react'

const DashboardHome = () => {
    const getGreeting = () => {
    const date = new Date();
    let hours = date.getHours();
    // console.log(hours);

    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  return (
     <div className="w-full ">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mt-12 sm:mt-16">
          {getGreeting()},{" "}
          <span className="text-purple-600 capitalize">{user.firstName}</span>{" "}
          👋
        </h1>
        <p className="text-center text-base sm:text-lg md:text-2xl mt-3 sm:mt-4 px-2">
          Welcome back! Here's what's happening today.
        </p>
      </div>
  )
}

export default DashboardHome