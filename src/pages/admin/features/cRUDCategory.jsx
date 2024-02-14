// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   Box,
// } from "@mui/material";

// const CategoryComponent = () => {
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("/category");
//       setCategories(response.data.category);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleAddCategory = async () => {
//     try {
//       await axios.post("/category", {
//         title: newCategory,
//         icon: "default",
//         type: "describe",
//       });
//       fetchCategories();
//       setNewCategory("");
//     } catch (error) {
//       console.error("Error adding category:", error);
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     try {
//       await axios.delete(`/category/${id}`);
//       fetchCategories();
//     } catch (error) {
//       console.error("Error deleting category:", error);
//     }
//   };

//   return (
//     <Box paddingInline={1}>
//       <Box marginBlock={3}>
//         <Typography variant="h4" align="left" gutterBottom>
//           Categories
//         </Typography>
//       </Box>
//       <Table>
//         <TableHead style={{ backgroundColor: "#f0f0f0" }}>
//           <TableRow>
//             <TableCell>Title</TableCell>
//             <TableCell>Icon</TableCell>
//             <TableCell>Type</TableCell>
//             <TableCell>Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {loading ? (
//             <TableRow>
//               <TableCell colSpan={4} align="center">
//                 <CircularProgress />
//               </TableCell>
//             </TableRow>
//           ) : (
//             categories.map((category) => (
//               <TableRow key={category._id}>
//                 <TableCell>{category.title}</TableCell>
//                 <TableCell>{category.icon}</TableCell>
//                 <TableCell>{category.type}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleDeleteCategory(category._id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>

//       <Box marginBlock={3}>
//         <Typography variant="h5" align="center" gutterBottom>
//           Add New Category
//         </Typography>
//         <Box style={{ display: "flex", justifyContent: "center" }}>
//           <TextField
//             label="Category Title"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//             variant="outlined"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddCategory}
//             style={{ marginLeft: "10px" }}
//           >
//             Add Category
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default CategoryComponent;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  AppBar,
} from "@mui/material";
import AdminLayout from "../../../layouts/adminLayout";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editCategory, setEditCategory] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/category");
      setCategories(response.data.category);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  // console.log(newCategory)
  const handleAddCategory = async () => {
    console.log(newCategory);
    try {
      await axios.post("/category", newCategory);
      fetchCategories();
      setNewCategory("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`/category/${selectedCategoryId}`);
      fetchCategories();
      setSelectedCategoryId(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditMode(true);
    setEditCategory(category);
  };

  const handleUpdateCategory = async () => {
    // console.log(editCategory._id);
    // console.log(editCategory);
    try {
      await axios.put(`/category/${editCategory._id}`, editCategory);
      fetchCategories();

      setEditMode(false);
      setEditCategory({});
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <AdminLayout title={"Property Category"}>
      <Box
        style={{ display: "flex", justifyContent: "center", marginBlock: 3 }}
      >
        <TextField
          label="Category Title"
          value={newCategory.title}
          onChange={(e) =>
            setNewCategory({ ...newCategory, title: e.target.value })
          }
          variant="outlined"
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Icon"
          value={newCategory.icon}
          onChange={(e) =>
            setNewCategory({ ...newCategory, icon: e.target.value })
          }
          variant="outlined"
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Type"
          value={newCategory.type}
          onChange={(e) =>
            setNewCategory({ ...newCategory, type: e.target.value })
          }
          variant="outlined"
          style={{ marginRight: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleAddCategory}>
          Add Category
        </Button>
      </Box>
      <Box marginBlock={2}>
        <form>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h3" align="center" gutterBottom>
              Please a select category
            </Typography>

            <div>
              <Typography variant="h5" align="left" gutterBottom>
                {editMode ? "Update Category" : "Add New Category"}
              </Typography>
              <Button
                variant="contained"
                onClick={() =>
                  handleEditCategory(
                    categories.find((cat) => cat._id === selectedCategoryId)
                  )
                }
              >
                Edit
              </Button>{" "}
              <Button onClick={handleUpdateCategory} variant="contained">
                Update{" "}
              </Button>{" "}
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteCategory}
              >
                Delete
              </Button>
            </div>
          </Box>
          <Table>
            <TableHead style={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow
                    key={category._id}
                    onClick={() => setSelectedCategoryId(category._id)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedCategoryId === category._id
                          ? "#e0e0e0"
                          : "inherit",
                    }}
                  >
                    <TableCell>
                      {editMode &&
                      editCategory &&
                      editCategory._id === category._id ? (
                        <TextField
                          value={editCategory.title}
                          onChange={(e) =>
                            setEditCategory({
                              ...editCategory,
                              title: e.target.value,
                            })
                          }
                          variant="outlined"
                          fullWidth
                          autoFocus
                        />
                      ) : (
                        category.title
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode &&
                      editCategory &&
                      editCategory._id === category._id ? (
                        <TextField
                          value={editCategory.icon}
                          onChange={(e) =>
                            setEditCategory({
                              ...editCategory,
                              icon: e.target.value,
                            })
                          }
                          variant="outlined"
                          fullWidth
                        />
                      ) : (
                        category.icon
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode &&
                      editCategory &&
                      editCategory._id === category._id ? (
                        <TextField
                          value={editCategory.type}
                          onChange={(e) =>
                            setEditCategory({
                              ...editCategory,
                              type: e.target.value,
                            })
                          }
                          variant="outlined"
                          fullWidth
                        />
                      ) : (
                        category.type
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </form>
      </Box>
    </AdminLayout>
  );
};

export default CategoryComponent;
