<template>
  <div class="notifications">
    <article
      v-for="notification in notifications"
      v-bind:key="notification.id"
      v-bind:class="['message', `is-${notification.type}`, { 'fade-out': notification.fade }]"
    >
      <div class="message-header">
        <p>{{ notification.title }}</p>

        <button
          class="delete"
          aria-label="delete"
          :disabled="notification.fade"
          @click="remove(notification)"
        ></button>
      </div>
      <div class="message-body">{{ notification.message }}</div>
    </article>
  </div>
</template>

<script>
export default {
  methods: {
    remove(notification) {
      this.$store.dispatch('removeNotification', notification);
    },
  },
  computed: {
    notifications() {
      return this.$store.getters.notifications || [];
    },
  },
};
</script>

<style scoped lang="scss">
@-webkit-keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.notifications {
  padding-top: 20px;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
}

.message {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.fade-out {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
