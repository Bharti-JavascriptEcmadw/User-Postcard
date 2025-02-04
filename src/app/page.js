"use client";

import { useState, useEffect } from "react";
import Modal from "./Components/Modal"; // Import the modal component

const Dashboard = () => {
  const [users, setUsers] = useState([]); // To store the list of users
  const [posts, setPosts] = useState([]); // To store the posts for the selected user
  const [loadingUsers, setLoadingUsers] = useState(true); // Loading state for users
  const [loadingPosts, setLoadingPosts] = useState(false); // Loading state for posts
  const [selectedUserId, setSelectedUserId] = useState(null); // To store the selected user ID
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [error, setError] = useState(null); // To handle errors
  const [currentPage, setCurrentPage] = useState(1); // To keep track of the current page
  const [usersPerPage] = useState(5); // Number of users to display per page

  // Fetch users from the API when the dashboard loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
        setLoadingUsers(false); // Stop loading once users are fetched
      } catch (error) {
        setError("Error fetching users data");
        setLoadingUsers(false);
      }
    };

    fetchUsers(); // Fetch users on initial load
  }, []);

  // Fetch posts for the selected user
  useEffect(() => {
    if (!selectedUserId) return; // Do nothing if no user is selected

    const fetchPosts = async () => {
      setLoadingPosts(true); // Start loading posts
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
        setLoadingPosts(false); // Stop loading once posts are fetched
      } catch (error) {
        setError("Error fetching posts data");
        setLoadingPosts(false);
      }
    };

    fetchPosts(); // Fetch posts whenever a user is selected
  }, [selectedUserId]);

  // Handle user card click to set the selected user
  const handleUserClick = (userId) => {
    setSelectedUserId(userId); // Set the selected user ID
    setPosts([]); // Clear previous posts when a new user is selected
    setModalVisible(true); // Show the modal
  };

  // Close the modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedUserId(null); // Reset selected user
  };

  // Get users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Users & Posts Dashboard</h1>

      {loadingUsers ? (
        <div className="text-center text-lg text-gray-500">Loading users...</div>
      ) : error ? (
        <div className="text-center text-lg text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user.id)} // When a user card is clicked
                className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-6 rounded-xl shadow-lg cursor-pointer"
              >
                <div className="flex flex-col space-y-4">
                  {/* User ID and Name */}
                  <p className="text-sm text-white opacity-80">
                    <strong>User ID:</strong> {user.id}
                  </p>
                  <h3 className="font-semibold text-xl text-white">{user.name}</h3>

                  {/* User Email */}
                  <p className="text-sm text-white opacity-80">
                    <strong>Email:</strong> {user.email}
                  </p>

                  {/* User Address */}
                  <p className="text-sm text-white opacity-70">
                    <strong>Address:</strong> {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                  </p>

                  {/* Company */}
                  <p className="text-sm text-white opacity-80">
                    <strong>Company:</strong> {user.company.name}
                  </p>

                  {/* View Posts Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleUserClick(user.id)} // When the "View Posts" button is clicked
                      className="w-32 py-2 bg-indigo-800 text-white rounded-lg shadow-md hover:bg-indigo-900 focus:outline-none"
                    >
                      View Posts
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-600 text-white rounded-l-lg disabled:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * usersPerPage >= users.length}
              className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal Component */}
      <Modal
        isVisible={modalVisible} // Pass the visibility of the modal
        posts={posts} // Pass the posts to display in the modal
        closeModal={closeModal} // Function to close the modal
        loadingPosts={loadingPosts} // Show loading state for posts
      />
    </div>
  );
};

export default Dashboard;