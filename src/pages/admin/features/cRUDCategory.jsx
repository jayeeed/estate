import { useState, useEffect } from "react";
import axios from "axios";

const CategoryComponent = () => {
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get("/category");
      setCategory(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const addCategory = async () => {
    try {
      const response = await axios.post("/category", {
        title: newCategory,
        icon: "game-icons:treehouse",
        type: "describe"
      });
      setCategory([...category, response.data]);
      setNewCategory("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/category/${categoryId}`);
      const updatedCategory = category.filter((cat) => cat._id !== categoryId);
      setCategory(updatedCategory);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {category.map((cat) => (
            <li key={cat._id}>
              {cat.title}
              <button onClick={() => deleteCategory(cat._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={addCategory}>Add Category</button>
    </div>
  );
};

export default CategoryComponent;
