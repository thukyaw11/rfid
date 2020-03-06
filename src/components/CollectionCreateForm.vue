<template>
  <div class="container">
    <a-alert
      :class="[this.alert_display?'diplayBlock':'displayNone']"
      message="New Student Reigstered!"
      type="success"
      showIcon
    />
    <div>
      <br />
      <md-button class="md-fab md-icon-button md-raised md-primary" @click="showModal">
        <md-icon>+</md-icon>
      </md-button>



      <!-- modal -->
      <a-modal
        :visible="visible"
        title="Register New Student"
        okText="Create"
        @cancel="closeModal"
        @ok="handleCreate"
      >
        <a-form layout="vertical">
          <a-form-item label="Name">
            <a-input placeholder="Enter your name" v-model="name" />
          </a-form-item>
          <a-form-item label="Father Name">
            <a-input placeholder="Enter your father name" v-model="fatherName" />
          </a-form-item>
          <a-form-item label="UIT ID">
            <a-input placeholder="eg - 1410" v-model="uitID" />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- modal end -->
      <!-- alert -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      alert_display: false,
      visible: false,
      name: "",
      fatherName: "",
      uitID: "",
      createdDate: "2002-02-02T00:00:00.000Z",
      expireDate: "2007-02-02T00:00:00.000Z",
      baseURL: "https://scapi.now.sh/api/create?",
      fileToWrite: true
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    handleCreate() {
      if (this.name && this.fatherName && this.uitID) {
        this.visible = false;
        const prasedId = parseInt(this.uitID);

        if (typeof prasedId == "number" && this.uitID.toString().length == 4) {
          const api_url = `${this.baseURL}name=${this.name}&fatherName=${this.fatherName}&id=${this.uitID}&createdDate=${this.createdDate}&expireDate=${this.expireDate}&fileToWrite=${this.fileToWrite}`;
          this.postToApi(api_url);
          this.registeredMessage();
        } else {
          alert("check your information!");
          this.visible = true;
        }
      } else {
        alert("ဖောင်ဖြည့်ဟ");
      }
    },
    postToApi(api_url) {
      axios
        .post(api_url)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    registeredMessage() {
      this.alert_display = true;
      setTimeout(() => {
        this.alert_display = false;
      }, 2000);

      this.name = "";
      this.fatherName = "";
      this.uitID = "";

    }
  }
};
</script>

<style>
.displayBlock {
  display: block;
}

.displayNone {
  display: none;
}
</style>