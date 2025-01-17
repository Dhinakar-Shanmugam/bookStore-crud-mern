import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state
  const { id } = useParams();  //use params

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setBook(res.data.data); // Ensure correct response format
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load book details");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>; // Display error message
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Id : </span>
          <span>{book._id}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Title : </span>
          <span>{book.title}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Author : </span>
          <span>{book.author}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Publish Year : </span>
          <span>{book.publishYear}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Create Time : </span>
          <span>{book.createdAt ? new Date(book.createdAt).toString() : 'N/A'}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Last Update Time : </span>
          <span>{book.updatedAt ? new Date(book.updatedAt).toString() : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
