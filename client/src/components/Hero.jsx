function Hero() {
  return (
    <section className="text-center py-20">

      <h1 className="text-6xl font-bold text-red-700">
        Emergency Blood Donor Finder
      </h1>

      <p className="mt-6 text-2xl text-gray-700">
        Connecting Blood Donors with People in Need
      </p>

      <div className="mt-10 flex justify-center gap-4">

        <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700">
          Find Donor
        </button>

        <button className="border-2 border-red-600 px-8 py-3 rounded-lg hover:bg-red-100">
          Become a Donor
        </button>

      </div>

      <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold text-red-600">500+</h2>
          <p>Registered Donors</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold text-red-600">100+</h2>
          <p>Lives Saved</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold text-red-600">24/7</h2>
          <p>Emergency Support</p>
        </div>

      </div>

    </section>
  );
}

export default Hero;