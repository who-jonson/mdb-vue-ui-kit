<template>
  <MDBNavbar expand="lg" light bg="light" container>
    <MDBNavbarBrand href="/">
      Brand
    </MDBNavbarBrand>
    <MDBNavbarToggler
      target="#navbarSupportedContent"
      @click="collapse1 = !collapse1"
    />
    <MDBCollapse id="navbarSupportedContent" v-model="collapse1">
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <MDBNavbarItem to="/" active>
          Home
        </MDBNavbarItem>
        <MDBNavbarItem href="/">
          Link
        </MDBNavbarItem>
        <MDBNavbarItem>
          <!-- Navbar dropdown -->
          <MDBDropdown v-model="dropdown1" class="nav-item">
            <MDBDropdownToggle
              tag="a"
              class="nav-link"
              @click="dropdown1 = !dropdown1"
            >
              Dropdown
            </MDBDropdownToggle>
            <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
              <MDBDropdownItem href="/">
                Action
              </MDBDropdownItem>
              <MDBDropdownItem href="/">
                Another Action
              </MDBDropdownItem>
              <MDBDropdownItem href="/">
                Something else here
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarItem>
        <MDBNavbarItem to="/" disabled>
          Disabled
        </MDBNavbarItem>
      </MDBNavbarNav>
      <!-- Search form -->
      <form class="d-flex input-group w-auto">
        <input
          type="search"
          class="form-control"
          placeholder="Type query"
          aria-label="Search"
        >
        <MDBBtn outline="primary">
          Search
        </MDBBtn>
      </form>
    </MDBCollapse>
  </MDBNavbar>
</template>

<script lang="ts">
import {
  MDBBtn,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler
} from 'mdb-vue-ui-kit'

export default defineComponent({
  components: {
    MDBBtn,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
  },
  setup() {
    const collapse1 = ref(false)
    const dropdown1 = ref(false)

    return {
      collapse1,
      dropdown1
    }
  }
})
</script>
