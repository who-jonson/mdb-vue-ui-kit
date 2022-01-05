<template>
  <div>
    <!-- Button trigger modal -->
    <MDBBtn color="primary" aria-controls="exampleModal" @click="exampleModal = true">
      Launch demo modal
    </MDBBtn>

    <MDBModal
      id="exampleModal"
      v-model="exampleModal"
      tabindex="-1"
      labelledby="exampleModalLabel"
    >
      <MDBModalHeader>
        <MDBModalTitle id="exampleModalLabel">
          Modal title
        </MDBModalTitle>
      </MDBModalHeader>
      <MDBModalBody>...</MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" @click="exampleModal = false">
          Close
        </MDBBtn>
        <MDBBtn color="primary">
          Save changes
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  </div>
</template>

<script lang="ts">
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle
} from 'mdb-vue-ui-kit'

export default defineComponent({
  components: {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn
  },
  setup() {
    const exampleModal = ref(false)

    return {
      exampleModal
    }
  }
})
</script>
