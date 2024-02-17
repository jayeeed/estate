import { useState, useEffect } from "react";
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
} from "@mui/material";
import AdminLayout from "../../../layouts/adminLayout";
import CustomizedSnackbars from "../../../components/snackbar";

const CategoryComponent = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editCategory, setEditCategory] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
      const response = await axios.delete(`/category/${selectedCategoryId}`);
      if (response.status === 204) {
        setMessage("Successfully deleted");
        setType("success");
        setOpen(true);
        fetchCategories();
        setSelectedCategoryId(null);
      } else if (response.status === 205) {
        setMessage('Cannot delete category. It has existing properties.');
        setType("warning");
        setOpen(true);
      } else {
        setMessage("An error occurred while deleting the category.");
        setType("warning");
        setOpen(true);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setMessage("An error occurred while deleting the category.");
      setType("error");
      setOpen(true);
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
              Please select a category
            </Typography>

            <div>
              <Typography variant="h5" align="left" gutterBottom>
                {editMode ? "Update Category" : "then choose"}
              </Typography>
              {editMode ? (
                <>
                  <Button onClick={handleUpdateCategory} variant="contained">
                    Update
                  </Button>{" "}
                </>
              ) : (
                <>
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
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteCategory}
                  >
                    Delete
                  </Button>{" "}
                </>
              )}
            </div>
          </Box>
          <Table sx={{width: '100%'}}>
          <Box style={{ maxHeight: '60vh', overflowY: 'auto',width: '100%', backgroundColor: "white", borderRadius:8}} >
            
            <TableHead style={{ backgroundColor: "#f0f0f0"  }}>
              <TableRow>
                <TableCell style={{ width: '30%' }}>Title</TableCell>
                <TableCell style={{ width: '40%' }}>Icon</TableCell>
                <TableCell style={{ width: '30%' }}>Type</TableCell>
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
            </Box>
          </Table>
        </form>
      </Box>
      <CustomizedSnackbars
        open={open}
        message={message}
        type={type}
        onClose={handleClose}
      />
    </AdminLayout>
  );
};

export default CategoryComponent;
