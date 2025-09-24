import { classService } from "./classService.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state for the class slice
const initialState = {
  classes: null,
  Loading: false,
  isError: false,
  isSuccess: false,

  // Specific states for create class
  createClass: null,
  createClassLoading: false,
  createClassError: null,
  createClassSuccess: null,

  // states for get class by id
  classDetails: null,
  classDetailsLoading: false,
  classDetailsError: null,
  classDetailsSuccess: false,
};

export const createClass = createAsyncThunk(
  "class/create",
  async (className, thunkApi) => {
    try {
      const response = await classService.createClass(className);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getClasses = createAsyncThunk(
  "class/getAll",
  async (_, thunkApi) => {
    try {
      const response = await classService.getClasses();
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getClassById = createAsyncThunk(
  "class/getById",
  async (classId, thunkApi) => {
    try {
      const response = await classService.getClassById(classId);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getClassByCode = createAsyncThunk(
  "class/getByCode",
  async (classCode, thunkApi) => {
    try {
      const response = await classService.getClassByCode(classCode);
      console.log(response);
      
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getClassByName = createAsyncThunk(
  "class/getByName",
  async (className, thunkApi) => {
    try {
      const response = await classService.getClassByName(className);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const joinClass = createAsyncThunk(
  "class/join",
  async (joinData, thunkApi) => {
    try {
      const response = await classService.joinClass(joinData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteClass = createAsyncThunk(
  "class/delete",
  async (classId, thunkApi) => {
    try {
      const response = await classService.deleteClass(classId);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const classSlice = createSlice({
  name: "class",
  initialState: initialState,
  reducers: {
    // Create Class Reset
    resetCreateClass: (state) => {
      state.createClassLoading = false;
      state.createClassError = null;
      state.createClassSuccess = false;
    },

    // Classes Reset
    reset: (state) => {
      state.Loading = false;
      state.isError = false;
      state.isSuccess = false;
    },
    classDetailsReset: (state) => {
      state.classDetailsLoading = false;
      state.classDetailsError = null;
      state.classDetailsSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Class
      .addCase(createClass.pending, (state) => {
        state.createClassLoading = true;
        state.createClassSuccess = false;
        state.createClassError = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.createClassLoading = false;
        state.createClassSuccess = true;
        state.createClass = action.payload;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.createClassLoading = false;
        state.createClassSuccess = false;
        state.createClassError = action.payload;
      })

      // Get All Classes
      .addCase(getClasses.pending, (state) => {
        state.Loading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.Loading = false;
        state.isSuccess = true;
        state.classes = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.Loading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Class By ID
      .addCase(getClassById.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getClassById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classes = action.payload.data;
        state.message = "Class Get by ID successfully";
      })
      .addCase(getClassById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Class By Code
      .addCase(getClassByCode.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getClassByCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classes = action.payload.data;
        state.message = "Class Get by Code successfully";
      })
      .addCase(getClassByCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Class By Name
      .addCase(getClassByName.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getClassByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classes = action.payload.data;
        state.message = "Class Get by Name successfully";
      })
      .addCase(getClassByName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Join Class
      .addCase(joinClass.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(joinClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classes.push(action.payload.data);
        state.message = "Joined class successfully";
      })
      .addCase(joinClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete Class
      .addCase(deleteClass.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classes = state.classes.filter(
          (cls) => cls._id !== action.payload.data._id
        );
        state.message = "Class deleted successfully";
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetCreateClass, reset } = classSlice.actions;

export default classSlice.reducer;
