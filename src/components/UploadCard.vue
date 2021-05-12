<template>
  <div class="card upload-card">
    <h3 class="card-heading">Add Robot</h3>
    <form>
      <label for="name-input">Name</label>
      <input type="text" id="name-input" name="name" v-model="robotName">
      <div class="image-upload-container">
        <label for="image-upload" class="image-label">
          <uploadIcon />
          <div>Select image to upload</div>
        </label>
        <input @change="handleFileChange" type="file" id="image-upload" name="image" accept="image/*">
      </div>
      <div class="btn-row">
        <button class="btn-link">Clear</button>
        <button class="btn" :disabled="!hasRobotData">Add Robot</button>
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
      if (this.robotName && this.robotImage) {
        return true;
      } return false;
    },
  },
  data() {
    return {
      robotName: null,
      robotImage: null,
    };
  },
  methods: {
    handleFileChange($e) {
      const file = $e.target.files;
      this.robotImage = file;
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
      white-space: nowrap;
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
  }
}
</style>
