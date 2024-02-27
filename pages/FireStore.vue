<template>
  <div class="main-dash">
    <div class="dash">
      <div class="sidebar">
        <div class="sidebar-logo">
          <div class="logo">
            <img
              style="width: -webkit-fill-available;"
              src="../pages/assets/download__3_-removebg-preview.png"
              alt="Vista Learning"
            />
          </div>

          <div class="sidebar-content">
            <div class="sidebar-user">
              <el-button class="side-btn">User Profile</el-button>
            </div>

            <div class="sidebar-logout">
              <button class="side-btn">Log out</button>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="dashboard_drop">
        <h1 class="text">Dashboard</h1>
      </div>
        
        <div class="main-content">
          <div class="main-user">
            <el-table class="table-main" :data="displayedItems" style="width: 100%;">
              <el-table-column label="First Name" prop="user_details.firstName"></el-table-column>
              <el-table-column label="Email" prop="user_details.email"></el-table-column>
              <el-table-column label="Mobile No" prop="user_details.mobileNumber"></el-table-column>
              <el-table-column label="User Message" prop="user_message"></el-table-column>
              <el-table-column label="Status" prop="status" class="todo"></el-table-column> <!-- New Status Column -->
              <el-table-column label="Device Info">
                <template slot-scope="scope">
                  <el-button class="button" @click="toggleDeviceInfo(scope.$index)">
                    Device Info
                  </el-button>
                </template>
              </el-table-column>
             <el-table-column label="Action" prop="action" class="action">
  

      <el-select v-model="dropdownValue" @change="statusHandler" clearable placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
</el-table-column>
            </el-table>

            <el-pagination
              class="pagination"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="items.length"
              v-if="displayedItems"
            ></el-pagination>

            <div v-if="showDeviceInfoPopup" class="popup" @click.self="closeDeviceInfoPopup">
              <div class="popup-content" @click.stop>
                <span class="close-btn" @click="closeDeviceInfoPopup">&times;</span>
                <p v-if="selectedItem">Brand: {{ selectedItem.device_info.brand }}</p>
                <p v-if="selectedItem">OS Version: {{ selectedItem.device_info.osVersion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, updateDoc, doc, } from 'firebase/firestore';
import { firestore } from '@/plugins/firebase.js';


export default {
data() {
  return {
    selectedOption: '',
    items: [],
    showUserDetails: null,
    showDeviceInfoPopup: false,
    selectedItem: null,
    currentPage: 1,
    pageSize: 6,
    showStatisticsSection: false,
    isAdminLogin: true,

    options: [{
          value: 'ToDo',
          label: 'ToDo'
        },
        {
          value: 'Start',
          label: 'Start'
        },
        {
          value: 'TicketRaised',
          label: 'Ticket Raised'
        }],
        dropdownValue:'',

  };
},

computed: {
  displayedItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.items.slice(startIndex, endIndex).map((item) => ({
        ...item,
        status: item.ticket_status || 'To Do', // Display Firestore status or default to 'To Do'
      }));
    },
  },
  

async mounted() {
  const firebaseConfig = {
    apiKey: 'AIzaSyD8y84n0QcBffWi45YmvE3EmR5tpyfb-xs',
    authDomain: 'vlearning-e7dae.firebaseapp.com',
    databaseURL: 'https://sign-11111.firebaseio.com',
    projectId: 'vlearning-e7dae',
    storageBucket: 'vlearning-e7dae.appspot.com',
    messagingSenderId: '528784283470',
    appId: '1:528784283470:web:3b828000ed2d01749af01f',
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);

  try {
    const querySnapshot = await getDocs(collection(firestore, 'user_feedback'));
    const fetchedItems = querySnapshot.docs.map((doc) => {
      const { user_details, user_message, device_info,status } = doc.data();
      return { _id: doc.id, user_details, user_message, device_info,};
    });
    this.items = fetchedItems;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
},

methods: {



  statusHandler()
  {
    console.log(this.dropdownValue)
  },


  selectOption(command) {
      console.log('Option selected:', command);
      this.selectedOption = command;
  },

   

    storeSelectedItemToFirestore() {
  const selectedItem = this.selectedItem;  
      console.log(this.dropdownValue);
  // if (selectedItem && this.selectedOption) {
  //   const userFeedbackCollection = collection(firestore, 'user_feedback');
  //   const docRef = doc(userFeedbackCollection, selectedItem._id);

  //   const updatedData = { status: this.selectedOption };


  //   updateDoc(docRef, updatedData)
  //         .then(() => {
  //           console.log('Selected item successfully written to Firestore!');
  //         })
  //         .catch((error) => {
  //           console.error('Error writing document: ', error);
  //         });
  //     } else {
  //       console.error('No item selected or no option chosen.');
  //     }
    },

  handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
    
   
      
    toggleDeviceInfo(index) {
      this.showDeviceInfoPopup = true;
      this.selectedItem = this.displayedItems[index];
      console.log(this.selectedItem);

  // this.selectedItem = this.items[index]; // Use displayedItems instead of items
},
// showSelectStatus(showSelect) {
//       this.showSelect = true;
//       console.log(showSelect)
      

//   // this.selectedItem = this.items[index]; // Use displayedItems instead of items
// },
  closeDeviceInfoPopup(event) {
    if (event.target.classList.contains('popup')) {
      this.showDeviceInfoPopup = false;
      this.selectedItem = null;
    }
  },
  deleteItem(index) {
    try {
      const docId = this.items[index]._id;
      deleteDoc(doc(firestore, 'user_feedback', docId));
      this.items.splice(index, 1);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  },
  
  async updateStatus(docId, status) {
    try {
      await updateDoc(doc(firestore, 'user_feedback', docId), { status });
      const index = this.items.findIndex((item) => item._id === docId);
      if (index !== -1) {
        this.items[index].status = status;
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  },
},
};
</script>



<style>

body {
margin: 0;
padding: 0;
color: white;
box-sizing: inherit;
font-family: 'Poppins', sans-serif;
}
.main {
display: flex;
flex-direction: column;
}
.el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.main-content {
height: 100%;
width: 100%;
padding: 20px;
/* display: flex; */
justify-content: center;
}
.el-table tr{
background-color: #1f2d52 !important;
color: white;

}
.table-main{
background-color: #151831 !important;
border-radius: 13px;

}
.main-user,
.main-feedback,
.main-stats {
border: 1px solid #1f2d52;
border-radius: 1rem;
padding: 10px;
height: 80%;
width: 80%;
transition: all 0.3s ease-in-out;
}
.todo{
  background-color: green;
}
.user-table{

width: 103%;
color: aliceblue;

}
.pagination
{
margin-top: 2pc !important;
margin-left: 18pc;
}
.el-pagination__rightwrapper {
float: left;
}
.main-user {
width: 100%;
height: inherit;
color: black;
}
.el-table th.el-table__cell>.cell {
display: inline-block;
box-sizing: border-box;
position: relative;
vertical-align: middle;
padding-left: 11px;
padding-right: 14px;
width: 100%;
color: black;
margin-right: 11px;
}
.el-pagination span:not([class*=suffix]) {
display: inline-block;
font-size: 13px;
min-width: 35.5px;
height: 28px;
line-height: 28px;
vertical-align: top;
box-sizing: border-box;
color: aliceblue;
}
.main-dash {
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
}
.heading_tab{
margin-bottom: 12px;
}
.dash {
display: grid;
grid-template-columns: [side-start]20%[side-end main-start] 80%[main-end];
height: 100%;
width: 100%;
box-shadow: 8px 16px 32px 5px #1f2d52;
}

.sidebar {
background-color: #1f2d52;
grid-column: side-start/side-end;
display: flex;
flex-direction: column;
align-items: center;
gap: 12px;
padding: 5px;
}
.table th.el-table__cell.is-leaf {
border-bottom: 1px solid #425b96!important;
}

.el-table tr:hover {
background-color: #3a4d78 !important; /* Change this to your preferred hover color */
}
.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
background-color: #213d68;
}

.main {
background-color: #151831;
grid-column: main-start/main-end;
height: 100%;
}

.logo {
}

.chart-container {
position: absolute;
top: 14pc;
right: 84px;
width: 303px;
/* height: 300px; */
}

.sidebar-user,
.sidebar-statistics,
.sidebar-logout {
width: 100%;
transition: all 0.3s ease-in-out;
}

.sidebar-user:hover,
.sidebar-statistics:hover,
.sidebar-logout:hover {
background-color: #151831;
}

.side-btn {
width: 100%;
padding: 20px;
border: none;
background-color: transparent;
color: white;
}

.sidebar-content {
display: flex;
flex-direction: column;
gap: 20px;
}
.text{
padding-left: 24px !important;
}
.close-btn {
position: absol
}
.popup-content {
background-color: white;
padding: 20px;
border-radius: 8px;
width: 60%;
max-width: 400px;
text-align: center;
position: relative;
}
.popup {
display: flex;
justify-content: center;
align-items: center;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
cursor: pointer;
}
.button {
display: inline-block;
padding: 10px 20px;
background-color: #184288;
color: #fff6f6;
border: none;
border-radius: 22px;
cursor: pointer;
}
.details {
font-weight: bold;
}

.message {
margin-top: 10px;
}

.info {
margin-top: 10px;
}
* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

/* Styles for the main container */
.container {
display: flex;
flex-direction: column;
align-items: center;
font-family: 'Poppins', sans-serif;
max-width: 808px;
margin: 14px 78px;
padding: 36px;
background-color: #f5f5f5;
border-radius: 8px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
text-align: center;
font-size: 24px;
margin-bottom: 20px;
margin-top: 20px;
}

.item {
background-color: #fff;
padding: 20px;
border-radius: 8px;
margin-bottom: 10px;
box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

</style>







