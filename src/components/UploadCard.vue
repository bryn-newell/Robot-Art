<template>
  <div class="card upload-card">
    <h3>Add Robot</h3>
    <form>
      <label for="name-input">Name</label>
      <input type="text" id="name-input" name="name">
      <label for="image-upload">Select image to upload</label>
      <input type="file" id="image-upload" name="image" accept="image/*">
      <div class="btn-row">
        <button class="btn-link">Clear</button>
        <button class="btn" disabled="true">Add Robot</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.upload-card {
  max-width: 397px;
  padding: 24px;
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
