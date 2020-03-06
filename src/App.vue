<template>
  <div id="app">
    <HelloWorld />
    <div class="container">
      <a-alert
        :class="[this.alert_display?'diplayBlock':'displayNone']"
        message="Deleted Successfully!"
        type="error"
        showIcon
      />
      
      <div class="row mt-3 mb-5">
        <div class="col-12" v-for="data in datas" v-bind:key="data.uitID">
          <div class="dataContainer mt-2">
            <p class="student_name">{{data.name}}</p>
            <p class="father_name">Father Name - {{data.fatherName}}</p>
            <p class="student_id">UIT - {{data.id}}</p>
            <h6>
              <b>Log history </b>
            </h6>
            <br />
            <div class="logHistory" v-for="history in data.history" v-bind:key="history">
              <p>{{ history | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</p>
            </div>

            <a-popconfirm
              title="Are you sure delete this task?"
              @confirm="confirm(data.id)"
              @cancel="cancel"
              okText="Yes"
              cancelText="No"
            >
              <p id="trash">
                <a href="#">Delete</a>
              </p>
            </a-popconfirm>
          </div>
        </div>
      </div>
    </div>

    <div id="buttonReg">
      <CollectionCreateForm />
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import HelloWorld from "./components/NavBar.vue";
import CollectionCreateForm from "./components/CollectionCreateForm.vue";
import * as moment from 'moment';

export default {
  name: "App",
  components: {
    HelloWorld,
    CollectionCreateForm
  },
  data() {
    return {
      datas: "",
      alert_display: false,
      visible: false,
      parsedDate : [],
      toParse : ''
    };
  },
  mounted() {
    axios.get("https://scapi.now.sh/api/read").then(res => {
      this.datas = res.data;
      this.setData(res.data);
    
    })
    .catch(error=>console.log(error));
    console.log(this.parsedDate);
  },
  methods: {
    setData(data){
      this.datas = data;
      this.datas.forEach(element => {
          this.toParse = element.history.getHours();
          // this.parsedDate.push(element.history.getHours());
          console.log(moment().format(this.toParse));
      });
    },
    confirm(uitID) {
      console.log(uitID);
      const delete_apiUrl = `https://scapi.now.sh/api/delete?searchid=${uitID}`;
      this.deleteToApi(delete_apiUrl);
      this.deleteDoneMessage();
    },
    deleteToApi(delete_apiUrl) {
      axios.delete(delete_apiUrl).then(function(respones) {
        console.log(respones);
        this.datas = respones.data;
      });
    },
    cancel(e) {
      console.log(e);
    },
    deleteDoneMessage() {
      this.alert_display = true;
      setTimeout(() => {
        this.alert_display = false;
        window.location.reload();
      }, 1000);
    }
  }
};
</script>

<style>
#trash {
  float: right;
}
.dataContainer {
  height: auto;
  width: 100%;
  background: white;
  border-radius: 5px;
  padding: 30px;
  color: black;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.19), 0 1px 1px rgba(0, 0, 0, 0.23);
}

#buttonReg {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0px 20px 20px 0px;
}
#btn {
  padding: 20px;
}
.student_name {
  font-size: 20px;
  font-weight: bold;
}
</style>
