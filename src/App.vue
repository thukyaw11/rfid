<template>
  <div id="app">
    <HelloWorld />
    <div class="container">
      <div class="row mt-3 mb-5" v-if="datas">
        <div class="col-12" v-for="data in datas" v-bind:key="data.uitID">
          <div class="dataContainer mt-2">
            <p class="student_name">{{data.name}}</p>
            <p class="father_name">Father Name - {{data.fatherName}}</p>
            <p class="student_id">UIT - {{data.id}}</p>
            <h6>
              <b>Log history</b>
            </h6>
            <br />
            <div class="logHistory" v-for="history in data.history" v-bind:key="history">
              <p>{{ history | dateFormat}}</p>
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

      <div class="row">
        <div class="center-block" style="text-align:center;">
          <span>
            <a-icon type="loading" :style="{ fontSize: '150px', color: '#08c'}" />
          </span>
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

export default {
  name: "App",
  components: {
    HelloWorld,
    CollectionCreateForm
  },
  data() {
    return {
      datas: "",
      visible: false,
      parsedDate: [],
      toParse: "",
      interval: ""
    };
  }, // in your created hook
  created() {
    this.interval = setInterval(this.refreshData, 500);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  filters: {
    dateFormat: function(value) {
      if (value) {
        var dt = value.split(/[: T-]/).map(parseFloat);
        console.log(dt[1]);
        return new Date(
          dt[0],
          dt[1] - 1,
          dt[2],
          dt[3] || 0,
          dt[4] || 0,
          dt[5] || 0,
          0
        );
      }
    }
  },

  methods: {
    refreshData() {
      axios
        .get("https://scapi.now.sh/api/read")
        .then(res => {
          this.datas = res.data.slice().reverse();
          this.setData(res.data);
        })
        .catch(error => console.log(error))
        .finally(console.log("finally"));
    },

    setData(data) {
      this.datas = data.slice().reverse();
    },
    confirm(uitID) {
      console.log(uitID);
      const delete_apiUrl = `https://scapi.now.sh/api/delete?searchid=${uitID}`;
      this.deleteToApi(delete_apiUrl);
    },
    deleteToApi(delete_apiUrl) {
      axios.delete(delete_apiUrl).then(function(respones) {
        console.log(respones);
        this.datas = respones.data;
      });
    },
    cancel(e) {
      console.log(e);
    }
  }
};
</script>

<style>
#trash {
  float: right;
}
.center-block{
  margin: 0 auto;
  margin-top: 250px;
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
