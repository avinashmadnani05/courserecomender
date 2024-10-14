const User = () => {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="https://placehold.co/40x40" alt="Nexcent Logo" className="mr-2"/>
                        <span className="text-xl font-bold text-gray-800">Nexcent</span>
                    </div>
                    <nav className="flex space-x-4">
                        <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
                        <a href="#" className="text-gray-600 hover:text-gray-800">Features</a>
                        <a href="#" className="text-gray-600 hover:text-gray-800">Community</a>
                        <a href="#" className="text-gray-600 hover:text-gray-800">Blog</a>
                        <a href="#" className="text-gray-600 hover:text-gray-800">Pricing</a>
                    </nav>
                    <a href="#" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Register Now</a>
                </div>
            </header>
                    <main>
                        <section className="bg-gray-100 py-20">
                            <div className="container mx-auto text-center">
                                <h1 className="text-4xl font-bold text-gray-800">Lessons and insights <br/> from <span className="text-green-500">8 years</span></h1>
                                <p className="text-gray-600 mt-4">Where to grow your business as a photographer: site or social media?</p>
                                <button className="bg-green-500 text-white px-6 py-3 mt-6 rounded hover:bg-green-600">Register</button>
                                <div className="mt-10">
                                    <img src="https://placehold.co/600x400" alt="Illustration of a person working on a computer" className="mx-auto"/>
                                </div>
                            </div>
                        </section>
                        <section className="py-20">
                            <div className="container mx-auto text-center">
                                <h2 className="text-2xl font-bold text-gray-800">Our Clients</h2>
                                <p className="text-gray-600 mt-2">We have been working with some Fortune 500+ clients</p>
                                <div className="flex justify-center items-center space-x-8 mt-8">
                                    <img src="https://placehold.co/100x50" alt="Client Logo 1"/>
                                    <img src="https://placehold.co/100x50" alt="Client Logo 2"/>
                                    <img src="https://placehold.co/100x50" alt="Client Logo 3"/>
                                    <img src="https://placehold.co/100x50" alt="Client Logo 4"/>
                                    <img src="https://placehold.co/100x50" alt="Client Logo 5"/>
                                </div>
                            </div>
                        </section>
                        <section className="bg-gray-100 py-20">
                            <div className="container mx-auto text-center">
                                <h2 className="text-2xl font-bold text-gray-800">Manage your entire community in a single system</h2>
                                <p className="text-gray-600 mt-2">Who is Nexcent suitable for?</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                                    <div className="bg-white p-6 rounded shadow">
                                        <i className="fas fa-users text-green-500 text-3xl mb-4"></i>
                                        <h3 className="text-xl font-bold text-gray-800">Membership Organisations</h3>
                                    </div>
                                    <div className="bg-white p-6 rounded shadow">
                                        <i className="fas fa-building text-green-500 text-3xl mb-4"></i>
                                        <h3 className="text-xl font-bold text-gray-800">National Associations</h3>
                                    </div>
                                    <div className="bg-white p-6 rounded shadow">
                                        <i className="fas fa-bicycle text-green-500 text-3xl mb-4"></i>
                                        <h3 className="text-xl font-bold text-gray-800">Clubs And Groups</h3>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="py-20">
                            <div className="container mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex items-center">
                                        <img src="https://placehold.co/400x300" alt="Illustration of people working together" className="w-full"/>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold text-gray-800">The unseen of spending three years at Pixelgrade</h3>
                                        <p className="text-gray-600 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula magna at magna dictum, in dictum erat facilisis.</p>
                                        <button className="bg-green-500 text-white px-6 py-3 mt-6 rounded hover:bg-green-600">Learn More</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="bg-gray-100 py-20">
                            <div className="container mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold text-gray-800">Helping a local business reinvent itself</h3>
                                        <p className="text-gray-600 mt-4">We helped them with our tools and dedication.</p>
                                        <div className="flex space-x-4 mt-4">
                                            <div className="text-center">
                                                <h4 className="text-xl font-bold text-gray-800">2,245,341</h4>
                                                <p className="text-gray-600">Customers</p>
                                            </div>
                                            <div className="text-center">
                                                <h4 className="text-xl font-bold text-gray-800">46,328</h4>
                                                <p className="text-gray-600">Members</p>
                                            </div>
                                            <div className="text-center">
                                                <h4 className="text-xl font-bold text-gray-800">828,867</h4>
                                                <p className="text-gray-600">Events</p>
                                            </div>
                                            <div className="text-center">
                                                <h4 className="text-xl font-bold text-gray-800">1,926,436</h4>
                                                <p className="text-gray-600">Payments</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <img src="https://placehold.co/400x300" alt="Illustration of a person using a mobile app" className="w-full"/>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="py-20">
                            <div className="container mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex items-center">
                                        <img src="https://placehold.co/400x300" alt="Illustration of a person designing a footer" className="w-full"/>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold text-gray-800">How to design your site footer like we did</h3>
                                        <p className="text-gray-600 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula magna at magna dictum, in dictum erat facilisis.</p>
                                        <button className="bg-green-500 text-white px-6 py-3 mt-6 rounded hover:bg-green-600">Learn More</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="bg-gray-100 py-20">
                            <div className="container mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold text-gray-800">Caring is the new marketing</h3>
                                        <p className="text-gray-600 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula magna at magna dictum, in dictum erat facilisis.</p>
                                        <button className="bg-green-500 text-white px-6 py-3 mt-6 rounded hover:bg-green-600">Learn More</button>
                                    </div>
                                    <div className="flex items-center">
                                        <img src="https://placehold.co/400x300" alt="Illustration of people caring for each other" className="w-full"/>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="py-20">
                            <div className="container mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="bg-white p-6 rounded shadow">
                                        <img src="https://placehold.co/400x300" alt="Person working on a laptop" className="w-full mb-4"/>
                                        <h3 className="text-xl font-bold text-gray-800">Creating Streamlined Safeguarding Processes</h3>
                                        <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600">Read more</button>
                                    </div>
                                    <div className="bg-white p-6 rounded shadow">
                                        <img src="https://placehold.co/400x300" alt="Person working on a laptop" className="w-full mb-4"/>
                                        <h3 className="text-xl font-bold text-gray-800">What are your safeguarding responsibilities?</h3>
                                        <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600">Read more</button>
                                    </div>
                                    <div className="bg-white p-6 rounded shadow">
                                        <img src="https://placehold.co/400x300" alt="Person working on a laptop" className="w-full mb-4"/>
                                        <h3 className="text-xl font-bold text-gray-800">Improving the Membership Experience</h3>
                                        <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600">Read more</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            );
        };

export default User