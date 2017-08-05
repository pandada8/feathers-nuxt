<template>
  <section class="container">
    <h1 class="title">
      Hello, World
    </h1>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: 'Hello, World'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
