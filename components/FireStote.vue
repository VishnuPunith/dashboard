

<template>
  <div class="container">
    <h1 class="title">User Query</h1>
    <ul>
      <li v-for="(item, index) in displayedItems" :key="index" class="item">
        <div v-if="item && item.user_details && typeof item.user_details === 'object'" class="details">
          <p>First Name: {{ item.user_details.firstName }}</p>
          <p>Email: {{ item.user_details.email }}</p>
          <p>Mobile No: {{ item.user_details.mobileNumber }}</p>
          <div v-if="item && item.user_message" class="message">
            <p>User Message : {{ item.user_message }}</p>
            <div v-if="item && item.device_info" class="info">
              <el-button class="button" @click="toggleDeviceInfo(index)">Device Info</el-button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <el-pagination class="pagination"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="items.length"
    ></el-pagination>

    <div v-if="showDeviceInfoPopup" class="popup" @click.self="closeDeviceInfoPopup">
      <div class="popup-content" @click.stop>
        <span class="close-btn" @click="closeDeviceInfoPopup">&times;</span>
        <p v-if="selectedItem">Brand: {{ selectedItem.device_info.brand }}</p>
        <p v-if="selectedItem">OS Version: {{ selectedItem.device_info.osVersion }}</p>
      </div>
    </div>

    <div class="chart-container">
      <canvas ref="pieChart"></canvas>
    </div>
  </div>
</template>

<script>
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      items: [],
      showUserDetails: null,
      showDeviceInfoPopup: false,
      selectedItem: null,
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.items.slice(startIndex, endIndex);
    },
  },
  async created() {
    const firebaseConfig = {
  apiKey: 'AIzaSyD8y84n0QcBffWi45YmvE3EmR5tpyfb-xs',
  authDomain: 'vlearning-e7dae.firebaseapp.com',
  databaseURL: 'https://sign-11111.firebaseio.com',
  projectId: 'vlearning-e7dae',
  storageBucket: 'vlearning-e7dae.appspot.com',
  messagingSenderId: '528784283470',
  appId: '1:528784283470:web:3b828000ed2d01749af01f'
};


    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);

    try {
      const querySnapshot = await getDocs(collection(db, 'user_feedback'));
      const fetchedItems = querySnapshot.docs.map((doc) => {
        const { user_details, user_message, device_info } = doc.data();
        return { user_details, user_message, device_info };
      });
      this.items = fetchedItems;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
    toggleDeviceInfo(index) {
      this.showDeviceInfoPopup = true;
      this.selectedItem = this.items[index];
    },
    closeDeviceInfoPopup(event) {
      if (event.target.classList.contains('popup')) {
        this.showDeviceInfoPopup = false;
        this.selectedItem = null;
      }
    },
    drawPieChart() {
      // Get the count of reported issues (dummy data for demonstration)
      const reportedIssuesCount = 60; // Replace this with your actual count of reported issues

      // Use Chart.js to create a pie chart
      const pieChartCanvas = this.$refs.pieChart;
      new Chart(pieChartCanvas, {
        type: 'pie',
        data: {
          labels: ['Reported Issues', 'Others'],
          datasets: [
            {
              label: 'Reported Issues',
              data: [reportedIssuesCount, 100 - reportedIssuesCount], // Assuming total is 100
              backgroundColor: ['#FF6384', '#36A2EB'], // Colors for the sections
              hoverOffset: 4, // Spacing when hovering over sections
            },
          ],
        },
        options: {
          animation: {
            animateRotate: true, // Enable rotation animation
            animateScale: true, // Enable scale animation
          },
        },
      });
    },
  },
  mounted() {
    this.drawPieChart(); // Call the method to draw the pie chart when the component mounts
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f4faff;; /* Apply Poppins font to the entire document */
}
/* Reset default margins and padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Styles for the main container */
.container {
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
}

.item {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
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

.button {
  display: inline-block;
    padding: 10px 20px;
    background-color: #184288;
    color: #fff6f6;
    border: none;
    border-radius: 22px;
    cursor: pointer;
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

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 60%;
  max-width: 400px;
  text-align: center;
  position: relative;
}

.close-btn {
  position: absol
}
.chart-container {
  position: absolute;
    top: 9pc;
    right: 84px;
    width: 338px;
    height: 300px;
}
</style>