<template>
  <div class="card upload-card">
    <h3 class="card-heading">Add Robot</h3>
    <form @submit.prevent="checkForm">
      <label for="name-input">Name</label>
      <input type="text" id="name-input" name="name" v-model="robotName">
      <div class="image-upload-container">
        <label for="image-upload" class="image-label">
          <uploadIcon />
          <div v-html="uploadText"></div>
        </label>
        <input @change="handleFileChange" type="file" id="image-upload" name="image" accept="image/*">
      </div>
      <div class="btn-row">
        <button class="btn-link" @click="clearUpload" type="button">Clear</button>
        <button class="btn" @click="handleAddRobot" :disabled="!hasRobotData" type="submit">Add Robot</button>
      </div>
    </form>
  </div>
</template>

<script>
import uploadIcon from '@/assets/Upload.svg';

export default {
  components: {
    uploadIcon,
  },
  computed: {
    hasRobotData() {
      if (this.robotName && this.imageName) {
        return true;
      } return false;
    },
    uploadText() {
      return this.imageName ? `${this.imageName} uploaded <br> or <br> Select a new image to upload` : 'Select image to upload';
    },
  },
  data() {
    return {
      robotName: null,
      imageName: null,
      robotFile: null,
    };
  },
  methods: {
    clearUpload(e) {
      this.robotName = null;
      this.imageName = null;
      this.robotFile = null;
      e.preventDefault();
    },
    checkForm() {
      // TO DO
    },
    handleAddRobot(e) {
      const robotObj = {
        name: this.robotName,
        votes: 0,
        imgPath: this.imageName,
        file: this.robotFile,
      };
      this.$store.dispatch('addRobot', robotObj);
      e.preventDefault();
    },
    async handleFileChange(e) {
      const file = e.target && e.target.files && e.target.files[0];
      this.robotFile = file;
      this.imageName = file.name;
    },
  },
};
</script>

<style lang="scss">
.upload-card {
  max-width: 397px;
  padding: 24px;
  .card-heading {
    margin-bottom: 41px;
  }
  form {
    width: 100%;
  }
  .image-upload-container {
    position: relative;
    .image-label {
      color: $gray-3;
      cursor: pointer;
      font-size: $font-size-20;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      user-select: none;
      -webkit-user-select: none;
      width: 100%;
      z-index: 2;
    }
    #image-upload {
      border: 2px dashed $gray-2;
      background-color: #ECEEF0;
      color: transparent;
      cursor: pointer;
      height: 208px;
      position: relative;
      width: 349px;
      &::-webkit-file-upload-button {
        visibility: hidden;
      }
    }
  }
  input {
    margin-bottom: 24px;
  }
  .btn-row {
    display: flex;
    .btn-link {
      margin-right: 48px;
    }
  }
  @media (max-width: $breakpoint-sm) {
    max-width: 359px;
    .image-upload-container #image-upload {
      width: 311px;
    }
  }
}
</style>
