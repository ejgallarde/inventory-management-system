new Vue({
  el: "#app",
  data: {
    title: "Inventory Management System",
    currentView: "dashboard", // Start with the dashboard view after login
    isAuthenticated: !!localStorage.getItem("token"), // The user is authenticated if they have a token
    token: localStorage.getItem("token") || null,
    currentUserRole: localStorage.getItem("userRole") || null,
    offices: [],
    officeForm: {
      Region: "",
      Province: "",
      OfficeType: "Central",
    },
    equipmentList: [],
    equipmentForm: {
      Equipment: "",
      Category: "",
      SerialNumber: "",
      CurrentStatus: "Received",
    },
    requestList: [],
    requestForm: {
      EquipmentID: "",
      FromOfficeID: "",
      ToOfficeID: "",
      RequestStatus: "Pending",
    },
    showModal: false,
    selectedEquipment: {},
    editForm: {
      Equipment: "",
      Category: "",
      SerialNumber: "",
      PropertyNumber: "",
      ParPtrIcsNumber: "",
      DateReceived: "",
      CurrentStatus: "",
      Remarks: "",
    },
  },
  created() {
    // Ensure the user is authenticated when the app loads
    if (!this.token || !this.currentUserRole) {
      console.log("No token found, redirecting to login.");
      window.location.href = "login.html";
    } else {
      console.log("Token found, loading the app...");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      window.location.href = "login.html";
    },
    navigate(view) {
      this.currentView = view;
      if (view === "offices") this.fetchOffices();
      if (view === "equipment") this.fetchEquipment();
      if (view === "requests") this.fetchRequests();
    },
    async fetchOffices() {
      try {
        const response = await axios.get("http://localhost:5000/api/offices", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.offices = response.data;
      } catch (error) {
        alert("Error fetching offices: " + error.response.data.error);
      }
    },
    async saveOffice() {
      try {
        const officeData = this.officeForm;
        if (officeData.OfficeID) {
          await axios.put(`http://localhost:5000/api/offices/${officeData.OfficeID}`, officeData, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
        } else {
          await axios.post("http://localhost:5000/api/offices", officeData, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
        }
        this.fetchOffices();
        this.officeForm = { Region: "", Province: "", OfficeType: "Central" };
      } catch (error) {
        alert("Error saving office: " + error.response.data.error);
      }
    },
    async deleteOffice(officeID) {
      try {
        await axios.delete(`http://localhost:5000/api/offices/${officeID}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.fetchOffices();
      } catch (error) {
        alert("Error deleting office: " + error.response.data.error);
      }
    },
    editOffice(office) {
      this.officeForm = { ...office };
    },
    async fetchEquipment() {
      try {
        const response = await axios.get("http://localhost:5000/api/equipment", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.equipmentList = response.data;
      } catch (error) {
        alert("Error fetching equipment: " + error.response.data.error);
      }
    },
    async saveEquipment() {
      try {
        const equipmentData = this.equipmentForm;
        if (equipmentData.EquipmentID) {
          await axios.put(`http://localhost:5000/api/equipment/${equipmentData.EquipmentID}`, equipmentData, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
        } else {
          await axios.post("http://localhost:5000/api/equipment", equipmentData, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
        }
        this.fetchEquipment();
        this.equipmentForm = { Equipment: "", Category: "", SerialNumber: "", CurrentStatus: "Received" };
      } catch (error) {
        alert("Error saving equipment: " + error.response.data.error);
      }
    },
    async deleteEquipment(equipmentID) {
      try {
        await axios.delete(`http://localhost:5000/api/equipment/${equipmentID}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.fetchEquipment();
      } catch (error) {
        alert("Error deleting equipment: " + error.response.data.error);
      }
    },
    openEditModal(equipment) {
      this.selectedEquipment = equipment;
      this.editForm = {
        Equipment: equipment.Equipment,
        EquipmentDescription: equipment.EquipmentDescription,
        Category: equipment.Category,
        SerialNumber: equipment.SerialNumber,
        PropertyNumber: equipment.PropertyNumber,
        ParPtrIcsNumber: equipment.ParPtrIcsNumber,
        DateReceived: equipment.DateReceived,
        CurrentStatus: equipment.CurrentStatus,
        Remarks: equipment.Remarks,
        MaintenanceID: equipment.MaintenanceID,
        IssuedTo: equipment.IssuedTo,
        LocationID: equipment.LocationID,
        PurchaseOrderID: equipment.PurchaseOrderID,
      };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedEquipment = {};
      this.editForm = {};
    },
    async updateEquipment() {
      try {
        const equipmentID = this.selectedEquipment.EquipmentID;
        await axios.put(`http://localhost:5000/api/equipment/${equipmentID}`, this.editForm, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.fetchEquipment(); // Refresh the equipment list after update
        this.closeModal(); // Close the modal after updating
      } catch (error) {
        alert("Error updating equipment: " + error.response.data.error);
      }
    },
    async fetchRequests() {
      try {
        const response = await axios.get("http://localhost:5000/api/requests", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.requestList = response.data;
      } catch (error) {
        alert("Error fetching requests: " + error.response.data.error);
      }
    },
    async saveRequest() {
      try {
        const requestData = this.requestForm;
        if (requestData.RequestID) {
          await axios.put(`http://localhost:5000/api/requests/${requestData.RequestID}`, requestData, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
        } else {
          await axios.post("http://localhost:5000/api/requests", requestData, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
        }
        this.fetchRequests();
        this.requestForm = { EquipmentID: "", FromOfficeID: "", ToOfficeID: "", RequestStatus: "Pending" };
      } catch (error) {
        alert("Error saving request: " + error.response.data.error);
      }
    },
    async deleteRequest(requestID) {
      try {
        await axios.delete(`http://localhost:5000/api/requests/${requestID}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.fetchRequests();
      } catch (error) {
        alert("Error deleting request: " + error.response.data.error);
      }
    },
    editRequest(request) {
      this.requestForm = { ...request };
    },
  },
});
