import React from "react";

const Modal = ({ isVisible, posts, closeModal, loadingPosts }) => {
  if (!isVisible) return null; // Don't render the modal if it's not visible

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full md:w-3/4 lg:w-1/2 max-h-[80vh] overflow-auto shadow-xl transform transition-all">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          User's Posts
        </h2>

        {loadingPosts ? (
          <div className="text-center text-lg text-gray-500">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-lg text-gray-500">No posts found for this user</div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800">Title: {post.title}</h3>
                <h4 className="text-sm text-gray-500 opacity-80">User ID: {post.userId}</h4>
                <h4 className="text-sm text-gray-500 opacity-80">Post ID: {post.id}</h4>
                <p className="text-gray-700 mt-2 text-sm">{post.body}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={closeModal}
            className="px-6 py-2 bg-blue-600 text-white rounded-full text-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
